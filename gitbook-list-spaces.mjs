import { GitBookAPI } from '@gitbook/api';

const token = "gb_api_poYcYbgBc8M5Jq09IPGQuv4W3Ym0cgbNRYTqatUl";
const organizationId = "LZczXqGSYofJh1NIOB4I";

const client = new GitBookAPI({ authToken: token });

async function listSpaces() {
  try {
    const { data } = await client.orgs.listSpacesInOrganizationById(organizationId);
    console.log("Доступные пространства (Spaces):");
    data.items.forEach(space => {
      console.log(`- Название: ${space.title}, ID: ${space.id}`);
    });
  } catch (err) {
    console.error("Ошибка:", err.message);
  }
}

listSpaces();
