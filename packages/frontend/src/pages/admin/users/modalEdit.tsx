import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import {
  getProductDetail,
  patchUser,
  sendEmailUpdate,
} from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";

function capitalizarTexto(texto: string) {
  // Divide el texto en palabras separadas por espacio
  let palabras = texto.toLowerCase().split(" ");

  // Capitaliza la primera letra de cada palabra
  for (let i = 0; i < palabras.length; i++) {
    palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1);
  }

  // Une las palabras de nuevo en una sola cadena
  return palabras.join(" ");
}

export default function ModalEdit({
  isOpen,
  onClose,
  valorModal,
}: {
  isOpen: boolean;
  onClose: () => void;
  valorModal: any;
}) {
  const [valorModal2, setValorModal2]: any = useState(); // Inicializa el estado del valorModal como una cadena vacía
  const dispatch: AppDispatch = useDispatch();
  const estados = [{ name: "active" }, { name: "inactive" }];
  const roles = [{ name: "USER" }, { name: "ADMIN" }];
  function actualizar(valor: any) {
    setValorModal2(valor); // Actualiza el estado del valorModal con el valor que se pasa a la función
  }
  useEffect(() => {
    actualizar(valorModal);
  }, [valorModal]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState,
    getValues,
    formState: { errors },
  } = useForm();
  //console.log(getValues());

  const onSubmit = (data: any) => {
    console.log(data);
    onClose();
    dispatch(patchUser(data));
    dispatch(sendEmailUpdate(data));
  };
  const forReset = () => {
    reset();
    onClose();
  };

  function RenderInputEditable(
    nombreLabel: string,
    value: any,
    nombreForm: string
  ) {
    setValue(nombreForm ? nombreForm : nombreLabel, value);
    const label = capitalizarTexto(nombreLabel);
    return (
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input
          {...register(nombreForm ? nombreForm : nombreLabel)}
          focusBorderColor="#00000059"
          bg="#dfdfdf"
          type="text"
          size="md"
          placeholder={"nombre"}
          _hover={{ borderColor: "gray.400" }}
          _focusVisible={{ borderColor: "gray.400" }}
          color="black"
          defaultValue={value}
          onChange={(e) =>
            setValue(nombreForm ? nombreForm : nombreLabel, e.target.value)
          }
        />
      </FormControl>
    );
  }
  function RenderInputBlocked(
    nombreLabel: string,
    value: any,
    nombreForm: string
  ) {
    const label = capitalizarTexto(nombreLabel);
    setValue(nombreForm ? nombreForm : nombreLabel, value);
    return (
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Input
          {...register(nombreForm ? nombreForm : nombreLabel, {
            value: value,
          })}
          value={value}
          cursor="initial"
          readOnly
          bg="#dfdfdf"
          size="md"
          borderRadius="none"
          _focusVisible={{ borderRadius: "none" }}
          _hover={{ borderColor: "none" }}
          color="black"
        />
      </FormControl>
    );
  }
  function RenderInputSelect(
    nombreLabel: string,
    value: any,
    nombreForm: string,
    options: any[]
  ) {
    setValue(nombreForm ? nombreForm : nombreLabel, value);
    const label = capitalizarTexto(nombreLabel);
    return (
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Select
          {...register(nombreForm ? nombreForm : nombreLabel)}
          placeholder={"Seleccionar " + label}
          bg="#dfdfdf"
          defaultValue={value}
          onChange={(e) =>
            setValue(nombreForm ? nombreForm : nombreLabel, e.target.value)
          }
        >
          {options.map((c: any, i: any) => {
            return (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            );
          })}
        </Select>
      </FormControl>
    );
  }
  return (
    <Modal isOpen={isOpen} onClose={forReset}>
      <ModalOverlay />
      <ModalContent>
        {valorModal2 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
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
              {RenderInputBlocked("id", valorModal2.id, "id")}
              {RenderInputEditable("nombre", valorModal2.name, "name")}
              {RenderInputBlocked("correo", valorModal2.email, "email")}
              {RenderInputSelect(
                "nivel de usuario",
                valorModal2.role,
                "role",
                roles
              )}
              {RenderInputSelect(
                "Estado de cuenta del usuario",
                valorModal2.state,
                "state",
                estados
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                //isDisabled={!formState.isDirty}
              >
                Guardar
              </Button>
              <Button onClick={forReset}>Cancelar</Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
