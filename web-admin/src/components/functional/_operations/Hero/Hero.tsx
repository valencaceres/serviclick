import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/AlertDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/Dialog";
import { Reorder } from "framer-motion";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useToast } from "~/components/ui/Use-Toast";
import { Button } from "~/components/ui/Button";
import { useHero } from "~/store/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import { DropZone } from "~/components/ui/Dropzone";
import { useUploadThing } from "~/utils/uploathing";
import { apiInstance } from "~/utils/api";
import { Pencil, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/Card";
import { type HeroItem } from "../../../../interfaces/hero";
import Image from "next/image";
import { Skeleton } from "~/components/ui/Skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";
import { HeroCarousel } from "~/components/ui/HeroCarousel";
import { NewsCarousel } from "~/components/ui/News";
import { AssistancesCarousel } from "~/components/ui/AssistanceCarousel";
import { Interests } from "~/components/ui/FamilyCarousel";

interface CustomFile extends File {
  preview: string;
}
interface itemsProps {
  type: string;
}

const formSchema = z.object({
  url: z.string(),
  alt: z.string().optional(),
  text: z.string().optional(),
  link: z.string().optional(),
  category_id: z.string().optional(),
  family_id: z.string().optional(),
});
const formSchemaEdit = z.object({
  alt: z.string().optional(),
  text: z.string().optional(),
  link: z.string().optional(),
  category_id: z.string().optional(),
  family_id: z.string().optional(),
});
export const Hero: React.FC<itemsProps> = ({ type }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDialogEdit, setIsDialogEdit] = useState<boolean>(false);

  const [imageId, setImageId] = useState<string>("");
  const [imageList, setImageList] = useState<HeroItem[] | undefined>(undefined);
  const [prevImageList, setPrevImageList] = useState<HeroItem[] | undefined>(
    imageList
  );
  const [imagePreview, setImagePreview] = useState<HeroItem | undefined>(
    undefined
  );
  const {
    getAll,
    list,
    post,
    isLoading,
    updateOrder,
    deleteById,
    update,
    categoryList,
    getFamilies,
    familyList,
    getCategories,
  } = useHero();
  useEffect(() => {
    getAll(type);
  }, [getAll]);
  useEffect(() => {
    if (list?.data) {
      setImageList(list.data);
    }
  }, [list?.data]);
  useEffect(() => {
    if (type === "category") {
      getCategories();
    }
  }, [getCategories]);
  useEffect(() => {
    if (type === "family") {
      getFamilies();
    }
  }, [getFamilies]);
  const { startUpload, isUploading } = useUploadThing("videoAndImage", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (error: Error) => {
      console.log(`ERROR! ${error.message}`);
      toast({
        description: "Ocurrio un error subiendo la imagen intenta nuevamente.",
        title: "Error al subir imagen",
        variant: "destructive",
      });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      alt: "",
      text: "",
      link: "",
      category_id: undefined,
      family_id: undefined,
    },
  });
  const formEdit = useForm<z.infer<typeof formSchemaEdit>>({
    resolver: zodResolver(formSchemaEdit),
    defaultValues: {
      alt: "",
      text: imagePreview?.text,
      link: imagePreview?.link,
      category_id: undefined,
      family_id: undefined,
    },
  });
  const handleSetImagePreviewClick = (clickedImage: HeroItem) => {
    setImagePreview({
      id: clickedImage.id,
      text: clickedImage.text,
      number: clickedImage.number,
      url: clickedImage.url,
      alt: clickedImage.alt,
      link: clickedImage.link,
      category_id: clickedImage.category_id,
      family_id: clickedImage.family_id,
    });
    setImageId(clickedImage.id);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await startUpload(files);
      if (res) {
        post(
          res[0]?.url?.toString(),
          values.text ?? "",
          values.text ?? "",
          type,
          values.link ?? "",
          values.category_id ?? "",
          values.family_id ?? "",
          {
            onSuccess: () => {
              getAll(type),
                toast({
                  description: "Imagen subida correctamente.",
                  title: "Imagen subida",
                });
              setIsDialogOpen(false);
              form.setValue("text", ""),
                form.setValue("alt", ""),
                form.setValue("category_id", undefined),
                form.setValue("link", ""),
                form.setValue("family_id", undefined);
              setFiles([]);
            },
          }
        );
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  const onSubmitEdit = async (values: z.infer<typeof formSchemaEdit>) => {
    try {
      update(
        values.text ?? "",
        values.text ?? "",
        imageId,
        type,
        values.link ?? "",
        values.category_id ?? "",
        values.family_id ?? "",
        {
          onSuccess: () => {
            getAll(type),
              toast({
                description: "imagen editada correctamente.",
                title: "imagen  editada",
              });
            setIsDialogEdit(false);
          },
        }
      );
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  useEffect(() => {
    if (JSON.stringify(prevImageList) !== JSON.stringify(imageList)) {
      updateOrder(imageList ?? [], type, {
        onError: () => {
          setImageList((prevImageList) => {
            if (prevImageList) {
              return [...prevImageList];
            }
            return undefined;
          });

          toast({
            description: "Error al actualizar el orden",
            title: "Error actualizando orden",
          });
        },
      });
      setPrevImageList(imageList);
    }
  }, [imageList]);

  useEffect(() => {
    if (imagePreview) {
      formEdit.setValue("text", imagePreview.text),
        formEdit.setValue("alt", imagePreview.alt),
        formEdit.setValue("category_id", imagePreview.category_id),
        formEdit.setValue("link", imagePreview.link),
        formEdit.setValue("family_id", imagePreview.family_id);
    }
  }, [imagePreview]);
  return (
    <div className="flex flex-col gap-2">
      {type === "hero" && (
        <div>
          <h2 className="text-center text-xl font-bold text-primary-500 ">
            HERO
          </h2>
          {/*           <HeroCarousel hero={imageList} />
           */}{" "}
        </div>
      )}
      {type === "news" && (
        <div>
          <h2 className="text-center text-xl font-bold text-primary-500 ">
            NOVEDADES
          </h2>
      {/*     <NewsCarousel news={imageList} /> */}
        </div>
      )}
      {type === "category" && (
        <div>
          <h2 className="text-center text-xl font-bold text-primary-500 ">
            CATEGORIAS
          </h2>
      {/*     <AssistancesCarousel
            assistances={categoryList}
            imageList={imageList}
          /> */}
        </div>
      )}
      {type === "family" && (
        <div>
          <h2 className="text-center text-xl font-bold text-primary-500 ">
            FAMILIAS
          </h2>
    {/*       <Interests families={familyList} imageList={imageList} /> */}
        </div>
      )}
      <Card className="flex flex-col ">
        <CardHeader className="w-full pb-0  md:p-6">
          <CardTitle className="text-xl">Imagenes</CardTitle>
          <CardDescription className="flex flex-row items-center justify-between">
            Imagenes que se mostrarán en el inicio en formato carrusel.
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button> Subir archivo</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Subir una nueva imagen</DialogTitle>
                  <DialogDescription>
                    Ingrese el texto que quiere que aparezca en la imagen
                    (opcional)
                  </DialogDescription>
                  <Form {...formEdit}>
                    <form>
                      <div className="space-y-2 ">
                        <div className="flex  flex-col gap-2">
                          <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>
                                  Texto que se coloca en el centro de la imagen
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Serviclick "
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Url de redireccion</FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="https://serviclick.cl "
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {type == "category" && (
                            <FormField
                              control={form.control}
                              name="category_id"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Categoria</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="text-primary-11">
                                        <SelectValue placeholder="Seleccione una categoria..." />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-64">
                                      {categoryList?.map((category) => (
                                        <SelectItem
                                          key={category.name}
                                          value={category.id}
                                          className="text-primary-11"
                                        >
                                          {category.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}{" "}
                          {type == "family" && (
                            <FormField
                              control={form.control}
                              name="family_id"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Familia</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="text-primary-11">
                                        <SelectValue placeholder="Seleccione una familia..." />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-64">
                                      {familyList?.map((family) => (
                                        <SelectItem
                                          key={family.name}
                                          value={family.id}
                                          className="text-primary-11"
                                        >
                                          {family.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                        <div className="h-1/2 w-full">
                          <DropZone files={files} setFiles={setFiles} />
                        </div>
                        <DialogFooter>
                          <Button
                            type="button"
                            onClick={form.handleSubmit(onSubmit)}
                            disabled={isLoading || isUploading}
                          >
                            {isLoading || isUploading
                              ? "Enviando..."
                              : "Enviar Imagen"}
                          </Button>
                        </DialogFooter>
                      </div>
                    </form>
                  </Form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full flex-col gap-2 px-6 py-4  md:px-4">
          <div className="flex flex-row gap-2">
            {imageList && imageList?.length > 0 && (
              <div className=" h-[200px] w-full   overflow-y-scroll md:h-[400px]">
                <Reorder.Group
                  axis="y"
                  values={imageList || []}
                  onReorder={(newImageList) => {
                    const updatedImageList = newImageList?.map(
                      (image, index) => ({
                        ...image,
                        number: index + 1,
                      })
                    );

                    setImageList(updatedImageList);
                  }}
                  className="flex   w-full flex-col gap-2    duration-75"
                >
                  {imageList?.map((image, index) => (
                    <Reorder.Item
                      value={image}
                      key={image?.id}
                      className="max-full border-primary-7 hover:border-primary-8 relative h-32 w-full cursor-pointer rounded-md border bg-transparent"
                      onClick={() => handleSetImagePreviewClick(image)}
                    >
                      <div className="absolute left-0 top-0 z-10 h-full w-full rounded-md bg-transparent"></div>
                      <Image
                        src={image.url}
                        alt={image.alt}
                        className="rounded-md object-cover"
                        fill
                      />
                      <h2 className="absolute left-40 top-1/2 self-center text-xl font-bold text-white">
                        {image.text}
                      </h2>
                      <div className="bg-primary-11 absolute right-2 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-black font-bold text-slate-200">
                        <p>{index + 1}</p>
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </div>
            )}
            <div className="border-primary-7 bg-primary-3 hover:border-primary-8 relative  h-[200px] w-[300px] rounded-md border duration-300 md:w-[500px] xl:h-[400px] xl:w-[1000px]">
              {imagePreview ? (
                <>
                  <Image
                    src={imagePreview?.url ?? ""}
                    alt={imagePreview?.alt ?? ""}
                    className="h-full w-full rounded-md object-cover"
                    fill
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-2 top-2 h-8 w-8 cursor-pointer rounded-full bg-black text-white hover:bg-gray-200"
                      >
                        <X />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white pb-20">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-destructive-11">
                          ¿Estás seguro/a que quieres eliminar esta imagen?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          disabled={isLoading}
                          onClick={() => {
                            deleteById(imagePreview?.id ?? "", type, {
                              onSuccess: async () => {
                                getAll(type),
                                  toast({
                                    description:
                                      "Imagen eliminada correctamente.",
                                    title: "Imagen eliminada.",
                                  });
                              },
                            });
                          }}
                          className="  bg-red-500"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>{" "}
                  <Dialog open={isDialogEdit} onOpenChange={setIsDialogEdit}>
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-12 top-2 h-8 w-8 cursor-pointer rounded-full bg-black text-white hover:bg-gray-200"
                      >
                        <Pencil />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar la imagen</DialogTitle>
                        <DialogDescription>
                          Texto de la imagen
                        </DialogDescription>
                        <Form {...formEdit}>
                          <form onSubmit={formEdit.handleSubmit(onSubmitEdit)}>
                            <div className="space-y-2 ">
                              <div className="flex  flex-col gap-2">
                                <FormField
                                  control={formEdit.control}
                                  name="text"
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormLabel>
                                        Texto que se coloca en el centro de la
                                        imagen
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          placeholder="Serviclick "
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={formEdit.control}
                                  name="link"
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormLabel>Url de redireccion</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="text"
                                          placeholder="https://serviclick.cl "
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                {type === "category" && (
                                  <FormField
                                    control={formEdit.control}
                                    name="category_id"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Categoria</FormLabel>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                          value={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger className="text-primary-11">
                                              <SelectValue placeholder="Seleccione una categoria..." />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent className="max-h-64">
                                            {categoryList?.map((category) => (
                                              <SelectItem
                                                key={category.name}
                                                value={category.id}
                                                className="text-primary-11"
                                              >
                                                {category.name}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                )}
                                {type === "family" && (
                                  <FormField
                                    control={formEdit.control}
                                    name="family_id"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Familia</FormLabel>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                          value={field.value}
                                        >
                                          <FormControl>
                                            <SelectTrigger className="text-primary-11">
                                              <SelectValue placeholder="Seleccione una familia..." />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent className="max-h-64">
                                            {familyList?.map((family) => (
                                              <SelectItem
                                                key={family.name}
                                                value={family.id}
                                                className="text-primary-11"
                                              >
                                                {family.name}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                )}
                              </div>
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  onClick={() => {
                                    setImageId(imagePreview.id);
                                  }}
                                  disabled={isLoading}
                                >
                                  {isLoading ? "editando..." : "Editar imagen"}
                                </Button>
                              </DialogFooter>
                            </div>
                          </form>
                        </Form>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <div
                  onClick={() => {
                    setIsDialogOpen(true);
                  }}
                  className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-gray-200 dark:border-gray-600 dark:bg-gray-700"
                >
                  <h2 className="px-6 py-2">Selecciona una imagen</h2>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
