import { UserPropertiesType } from '@models/User/types';
import CountryRespository from '@models/Country/repository';
import StateRespository from '@models/State/repository';
import CityRespository from '@models/City/repository';
import DistrictRespository from '@models/District/repository';
import mockUtils from '@utils/mockUtils';
import requestCEP from '@services/requestCEP';
import { EntityManager, getManager } from 'typeorm';

type optionsType = {
  /** Will use the name to find the stateId */
  stateName?: string;
  /** Will use the name to find the cityId */
  cityName?: string;
  /** Will use the cep data if it get one, even if names is given */
  priorizeCep?: boolean;
  entityManager?: EntityManager;
};

async function createUserMock(
  userData?: UserPropertiesType,
  options?: optionsType
) {
  const {
    districtName = 'Cocó',
    zipCode = '60060170',
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
  } = userData || {};

  const {
    cityName = 'Fortaleza',
    stateName = 'Ceará',
    priorizeCep = !!userData?.zipCode,
    entityManager = getManager(),
  } = options || {};

  const cepData = await requestCEP(zipCode);

  const countryId =
    countryIdProp ||
    (await entityManager
      .getCustomRepository(CountryRespository)
      .findOne({ where: { name: 'Brazil' } })
      .then((e) => e?.id));

  const stateId =
    stateIdProp ||
    (await entityManager
      .getCustomRepository(StateRespository)
      .findOne({
        where: priorizeCep
          ? [{ uf: cepData?.uf }, { name: stateName }]
          : [{ name: stateName }, { uf: cepData?.uf }],
      })
      .then((e) => e?.id));

  const cityId =
    cityIdProp ||
    (await entityManager
      .getCustomRepository(CityRespository)
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
    (await entityManager
      .getCustomRepository(DistrictRespository)
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
