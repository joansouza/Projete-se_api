import axios from 'axios';

type CEP = {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
};

async function requestCEP(cep: string | number): Promise<CEP> {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((e) => {
    let result = {} as CEP;
    if (e && e.data) {
      result = { ...e.data };
    }

    return result;
  });
}

export default requestCEP;
