import faker from 'faker';

const fakerData = (count = 100000) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      name: faker.name.findName(),
      country: faker.address.country(),
      city: faker.address.city(),
      avatar: faker.image.avatar()
    });
  }
  return data;
};

export default fakerData;
