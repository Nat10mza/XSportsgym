import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import * as actions from "../../../redux/actions/index";

export const EditTable = ({
  isOpen,
  onClose,
  idProduct,
  oldProduct,
  allProducts,
}: any) => {
  let dispatch: AppDispatch = useDispatch();
  let brands = useSelector((state: RootState) => state.brands);
  let categories = useSelector((state: RootState) => state.categories);
  let [image, setImage] = useState("");

  type Form = {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: string;
    stock: any;
    brandId: any;
    categoryId: any;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();

  let forReset = () => {
    onClose();
    reset();
  };

  let handleImage = (e: any) => {
    setImage(e.target.value);
  };

  let onSubmit = (data: any) => {
    forReset();

    var category: any = "";
    if (data.categoryId) {
      categories.forEach((cat: any) => {
        if (cat.name == data.categoryId) {
          category = cat;
        }
      });
    }

    var brand: any = "";
    if (data.brandId) {
      brands.forEach((br: any) => {
        if (br.name == data.brandId) {
          brand = br;
        }
      });
    }

    let res: any = {
      name: data.name,
      description: data.description,
      imageUrl: image,
      price: data.price,
      stock: data.stock ? Number.parseInt(data.stock) : "",
      brandId: data.brandId ? brand.id : "",
      categoryId: data.categoryId ? category.id : "",
    };

    var newData: any;
    for (const key in res) {
      if (res[key] !== "") newData = { ...newData, [key]: res[key] };
    }

    let filBrad: any = brands.filter((br: any) => br.id == newData.brandId);

    let filCat: any = categories.filter(
      (cat: any) => cat.id == newData.categoryId
    );

    let newProdcut = [
      { ...newData, brand: filBrad[0], category: filCat[0], id: idProduct },
    ];

    let deleteOldProduct = allProducts.filter((pr: any) => pr.id !== idProduct);

    let newAndOthers = newProdcut
      .concat(deleteOldProduct)
      .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    dispatch(actions.patchProduct(newData, idProduct, newAndOthers));
  };

  useEffect(() => {
    dispatch(actions.getAllBrands());
    dispatch(actions.getAllCategories());
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Modifica tu producto</ModalHeader>
            <Button
              onClick={forReset}
              borderRadius="99999%"
              padding={0}
              _hover={{ bg: "gray.200" }}
              position="absolute"
              right="10px"
              cursor="pointer"
              top="8px"
              height="33px"
              minW="33px"
            >
              <RxCross2 size={22} />
            </Button>
            <ModalBody pb={6}>
              <VStack spacing={3}>
                <FormControl>
                  <FormLabel>Nombre:</FormLabel>
                  <Input
                    {...register("name", { required: true })}
                    focusBorderColor="#00000059"
                    bg="#dfdfdf"
                    type="text"
                    size="md"
                    placeholder={"nombre"}
                    _hover={{ borderColor: "gray.400" }}
                    _focusVisible={{ borderColor: "gray.400" }}
                    color="black"
                    defaultValue={oldProduct.length ? oldProduct[0].name : ""}
                  />
                  {errors.name && <Text color="tomato">nombre requerido</Text>}
                </FormControl>

                <FormControl>
                  <FormLabel>Descripcion:</FormLabel>
                  <Input
                    {...register("description", { required: true })}
                    focusBorderColor="#00000059"
                    bg="#dfdfdf"
                    type="text"
                    size="md"
                    placeholder="descripcion"
                    _hover={{ borderColor: "gray.400" }}
                    _focusVisible={{ borderColor: "gray.400" }}
                    color="black"
                    defaultValue={
                      oldProduct.length ? oldProduct[0].description : ""
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Imagen:</FormLabel>
                  <Input
                    {...register("imageUrl")}
                    focusBorderColor="#00000059"
                    bg="#dfdfdf"
                    type="file"
                    size="md"
                    placeholder="url de la imagen"
                    _hover={{ borderColor: "gray.400" }}
                    _focusVisible={{ borderColor: "gray.400" }}
                    color="black"
                    onChange={handleImage}
                    // defaultValue={
                    //   oldProduct.length ? oldProduct[0].imageUrl : ""
                    // }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Precio:</FormLabel>
                  <Input
                    {...register("price", { required: true, min: 1 })}
                    focusBorderColor="#00000059"
                    bg="#dfdfdf"
                    type="number"
                    size="md"
                    placeholder="precio"
                    _hover={{ borderColor: "gray.400" }}
                    _focusVisible={{ borderColor: "gray.400" }}
                    color="black"
                    defaultValue={oldProduct.length ? oldProduct[0].price : ""}
                  />
                  {errors.price?.type === "min" && (
                    <Text color="tomato">El pecio debe ser mayor que 0</Text>
                  )}
                  {errors.price?.type === "required" && (
                    <Text color="tomato">Precio requerido</Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>Stock:</FormLabel>
                  <Input
                    {...register("stock", { required: true, min: 0 })}
                    focusBorderColor="#00000059"
                    bg="#dfdfdf"
                    type="number"
                    size="md"
                    placeholder="stock"
                    _hover={{ borderColor: "gray.400" }}
                    _focusVisible={{ borderColor: "gray.400" }}
                    color="black"
                    defaultValue={oldProduct.length ? oldProduct[0].stock : ""}
                  />
                  {errors.stock?.type === "required" && (
                    <Text color="tomato">Stock requerido</Text>
                  )}
                  {errors.stock?.type === "min" && (
                    <Text color="tomato">
                      El stock no puede ser menor que 0
                    </Text>
                  )}
                </FormControl>

                <FormLabel>Categorias:</FormLabel>
                <Select
                  {...register("categoryId", { required: true })}
                  placeholder="Seleccionar categoria"
                  bg="#dfdfdf"
                  defaultValue={
                    oldProduct.length ? oldProduct[0].category.name : ""
                  }
                >
                  {categories &&
                    categories.map((c: any, i: any) => {
                      return <option key={i}>{c.name}</option>;
                    })}
                </Select>
                {errors.categoryId && (
                  <Text color="tomato">Categoria requerida</Text>
                )}

                <FormLabel>Marcas:</FormLabel>
                <Select
                  {...register("brandId", { required: true })}
                  placeholder="Seleccionar marca"
                  bg="#dfdfdf"
                  defaultValue={
                    oldProduct.length ? oldProduct[0].brand.name : ""
                  }
                >
                  {brands &&
                    brands.map((b: any, i: any) => (
                      <option key={i}>{b.name}</option>
                    ))}
                </Select>
                {errors.brandId && <Text color="tomato">Marca requerida</Text>}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                // isDisabled={!formState.isDirty}
              >
                Guardar
              </Button>
              <Button onClick={forReset}>Cancelar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
