import { UserPropertiesType } from '@models/User/types';
import { getCountryRespository } from '@models/Country/repository';
import { getStateRespository } from '@models/State/repository';
import { getCityRespository } from '@models/City/repository';
import { getDistrictRespository } from '@models/District/repository';
import mockUtils from '@utils/mockUtils';
import requestCEP from '@services/requestCEP';

type optionsType = {
  /** Will use the name to find the stateId */
  stateName?: string;
  /** Will use the name to find the cityId */
  cityName?: string;
  /** Will use the cep data if it get one, even if names is given */
  priorizeCep?: boolean;
} & UserPropertiesType;

async function createUserMock(options?: optionsType) {
  const {
    districtName = 'Cocó',
    cityName = 'Fortaleza',
    stateName = 'Ceará',
    zipCode = '60060170',
    priorizeCep = !!options?.zipCode,
    birthday = mockUtils.getRandomBirthday().fromOne.asString,
    cpf = mockUtils.getRandomCPF(),
    email,
    name,
    countryId: countryIdProp,
    stateId: stateIdProp,
    cityId: cityIdProp,
    districtId: districtIdProp,
    /**
     * password: "123qwe!@#"
     * Utilize o size abaixo com 8 saltos para gerar uma senha criptografada.
     * https://bcrypt-generator.com/
     */
    password = '$2y$08$DhiikOQJ7.2xaIJacbeCsO3GxywjHKgVOz.I7gC63vkoHv8GHeCHq',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...rest
  } = options || {};

  const cepData = await requestCEP(zipCode);

  const countryId =
    countryIdProp ||
    (await getCountryRespository()
      .findOne({ where: { name: 'Brazil' } })
      .then((e) => e?.id));

  const stateId =
    stateIdProp ||
    (await getStateRespository()
      .findOne({
        where: priorizeCep
          ? [{ uf: cepData?.uf }, { name: stateName }]
          : [{ name: stateName }, { uf: cepData?.uf }],
      })
      .then((e) => e?.id));

  const cityId =
    cityIdProp ||
    (await getCityRespository()
      .findOne({
        where: [
          { name: priorizeCep ? cepData?.localidade : cityName, stateId },
          { name: priorizeCep ? cityName : cityName, stateId },
          { stateId },
        ],
      })
      .then((e) => e?.id));

  const districtId =
    districtIdProp ||
    (await getDistrictRespository()
      .findOne({
        where: [
          { name: priorizeCep ? cepData?.bairro : districtName, cityId },
          { name: priorizeCep ? districtName : cepData?.bairro, cityId },
          { cityId },
        ],
      })
      .then((e) => e?.id));

  const thisName =
    typeof name === 'string' && name.length > 0
      ? name
      : mockUtils.getRandomName().fullName;

  const nameSplited = thisName.split(' ');

  let thisEmail = email;

  if (!thisEmail) {
    const n1 = nameSplited?.[0]?.toLocaleLowerCase() || '';
    const n2 = nameSplited?.[1]?.toLocaleLowerCase() || '';

    thisEmail = n1 + n2 + '@email.com';
  }

  const commonUser: UserPropertiesType = {
    password,
    countryId,
    districtId,
    stateId,
    cityId,
    birthday,
    cpf,
    email: thisEmail,
    name: thisName,
    zipCode,
    districtName,
    ...rest,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return commonUser;
}

export default createUserMock;
