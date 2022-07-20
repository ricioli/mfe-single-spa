import yup from '../../utils/validation/yup';

const schema = yup.object().shape({
  emailCpf: yup
    .string()
    .required()
    .test(
      'is-email-cpf',
      () => 'E-mail ou CPF inválido',
      (value) => {
        return /^([0-9]{11}||[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2})$/.test(value) || /^.+@.+\..+$/.test(value)
      }
    ),
  senha: yup.string().required(),
});

export default schema;
