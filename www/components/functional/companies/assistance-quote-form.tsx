"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { companySizes } from "@/lib/company-sizes"
import { locations } from "@/lib/locations"
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
  size: z.string().min(1),
  area: z.string().min(1),
  region: z.string().min(1),
  district: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  name: z.string().min(1),
})

interface Families {
  family_id: string
  family_name: string
  product_id: string
  product_name: string
}

interface AssistanceQuoteFormProps {
  families: Families[]
}

export default function AssistanceQuoteForm({
  families,
}: AssistanceQuoteFormProps) {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const selectedRegion = form.watch("region")

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const size = companySizes.find((size) => size.value === data.size)?.label
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
          subject: "Serviclick Web - Formulario Empresa",
          message: `
          <h1>Formulario Empresa</h1>
          <p><strong>Empresa:</strong> ${data.company}</p>
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Correo:</strong> ${data.email}</p>
          <p><strong>Tamaño empresa:</strong> ${size}</p>
          <p><strong>Área de interés:</strong> ${data.area}</p>
          <p><strong>Región:</strong> ${data.region}</p>
          <p><strong>Comuna:</strong> ${data.district}</p>
        `,
        }),
      }
    )
    if (response.ok) {
      router.push("/")
      toast({
        title: "Formulario enviado",
        description: "Hemos recibido tu solicitud y te contactaremos pronto.",
      })
    } else {
      console.error(response)
      toast({
        title: "Error",
        description: "Ocurrió un error al enviar el formulario.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    form.setValue("district", "")
  }, [selectedRegion, form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-xl space-y-4"
      >
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tamaño empresa</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tamaño de tu empresa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
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
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Área de interés</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
                  disabled={!selectedRegion}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu comuna" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[224px]">
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
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre empresa</FormLabel>
              <FormControl>
                <Input
                  placeholder="Escribe el nombre de la empresa"
                  {...field}
                />
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
                <Input placeholder="Escribe tu nombre y apellido" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button>Aceptar</Button>
        </div>
      </form>
    </Form>
  )
}
