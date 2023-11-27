import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { Button } from "@chakra-ui/button";
import { useForm } from "react-hook-form";
import * as actions from "../../../redux/actions";
import { Text } from "@chakra-ui/layout";

type Brand = {
  name: string;
  description: string;
};

export const CreateBrands = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const dispatch: AppDispatch = useDispatch();

  let forReset_Close = () => {
    onClose();
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Brand>();

  let onSubmit = (data: any) => {
    dispatch(actions.createBrands(data));
    forReset_Close();
  };

  return (
    <>
      <Button
        mt={2}
        onClick={onOpen}
        bg="gray.200"
        color="blue.800"
        _hover={{ bg: "gray.300" }}
        h={35}
        w={117}
      >
        Crear Marca
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>Crea tu propia Marca</ModalHeader>
            <ModalCloseButton onClick={forReset_Close} />

            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nombre de la marca</FormLabel>
                <Input
                  {...register("name", { required: true })}
                  placeholder="nombre..."
                />
                {errors.name && (
                  <Text color="tomato">Nombre de la marca requerido</Text>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Descripción de la marca</FormLabel>
                <Input
                  {...register("description", { required: true })}
                  placeholder="descripción..."
                />
                {errors.description && (
                  <Text color="tomato">Nombre de la marca requerido</Text>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                onClick={handleSubmit(onSubmit)}
              >
                Crear
              </Button>
              <Button onClick={forReset_Close}>Cancelar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
