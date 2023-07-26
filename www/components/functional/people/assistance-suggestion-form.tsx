"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { locations } from "@/lib/locations"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "../../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form"
import { Input } from "../../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"

const FormSchema = z.object({
  age: z.string().min(1),
  assistance: z.string().min(1),
  region: z.string().min(1),
  district: z.string().min(1).optional(),
  email: z.string().email(),
  name: z.string().min(1),
})

interface Families {
  family_id: string
  family_name: string
  product_id: string
  product_name: string
}

interface AssistanceSuggestionFormProps {
  families: Families[]
}

export default function AssistanceSuggestionForm({
  families,
}: AssistanceSuggestionFormProps) {
  const { toast } = useToast()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      age: undefined,
      assistance: undefined,
      region: undefined,
      district: undefined,
      email: "",
      name: "",
    },
  })

  const selectedRegion = form.watch("region")
  const assistance = form.watch("assistance")

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const age =
      data.age === "young-adult"
        ? "Entre 18 y 30 años"
        : data.age === "adult"
        ? "Entre 31 y 60 años"
        : "Más de 60 años"

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_EMAIL_URL + "/api/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          id: process.env.NEXT_PUBLIC_API_EMAIL_KEY!,
        },
        body: JSON.stringify({
          from: data.email,
          to: "contacto-cv@serviclick.cl",
          subject: "Serviclick Web - Formulario Persona",
          message: `
          <h1>Formulario Persona</h1>
          <p>Nombre: ${data.name}</p>
          <p>Correo: ${data.email}</p>
          <p>Edad: ${age}</p>
          <p>Área de interés: ${data.assistance}</p>
          <p>Región: ${data.region}</p>
          <p>Comuna: ${data.district}</p>`,
        }),
      }
    )
    if (response.ok) {
      setIsOpen(true)
    } else {
      console.error(response)
      toast({
        title: "Error",
        description:
          "Ha ocurrido un error al enviar tu formulario, por favor intenta nuevamente.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    form.setValue("district", undefined)
  }, [selectedRegion, form])

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-xl space-y-4"
        >
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Edad</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu rango de edad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="young-adult">
                        Entre 18 y 30 años
                      </SelectItem>
                      <SelectItem value="adult">Entre 31 y 59 años</SelectItem>
                      <SelectItem value="senior">60 años o más</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assistance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Área de interés</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu área de interés" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {families.map((family) => (
                        <SelectItem
                          key={family.family_id}
                          value={family.family_name}
                        >
                          {family.family_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Región</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu región" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-56">
                      {locations.regions.map((region) => (
                        <SelectItem key={region.name} value={region.name}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comuna</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={!selectedRegion}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue=""
                          placeholder="Selecciona tu comuna"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-56">
                      {locations.regions
                        .find((region) => region.name === selectedRegion)
                        ?.districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Escribe tu e-mail"
                    type="email"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Escribe tu nombre y apellido"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button>Aceptar</Button>
          </div>
        </form>
      </Form>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="border-none focus:border-none">
          <div className="flex flex-col gap-4 text-center items-center">
            <h1 className="text-4xl font-semibold text-primary">
              ¡Felicidades!
            </h1>
            <h2 className="text-lg">
              Tu consulta ha sido enviada satisfactoriamente.
            </h2>
            <p>Te contactaremos dentro de 48 hrs hábiles.</p>
            <Button
              className="w-fit"
              onClick={() => {
                setIsOpen(false)
                router.push(
                  `/family/${
                    families.find((f) => f.family_name === assistance)
                      ?.family_id
                  }`
                )
              }}
            >
              Aceptar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
