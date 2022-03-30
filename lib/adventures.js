import AEMHeadless from '@adobe/aem-headless-client-js';

export class AdventureClient {
  static fromEnv(env = process.env) {
    if (!this.__envClient) {
      const { NEXT_PUBLIC_AEM_HOST, NEXT_GRAPHQL_ENDPOINT } = env;
      this.__envClient = new AdventureClient({
        serviceURL: NEXT_PUBLIC_AEM_HOST,
        endpoint: NEXT_GRAPHQL_ENDPOINT,
      });
    }
    return this.__envClient;
  }
  constructor({ serviceURL, endpoint }) {
    this.aemHeadlessClient = new AEMHeadless({
      serviceURL,
      endpoint,
      auth: ['admin', 'admin'], // TODO: dynamically set auth based on AEM instance
      fetch
    });
  }

  async getAllAdventures() {
    const query = `{
      adventureList {
        items {
          _path
          adventureTitle
          adventureDescription {
            plaintext
          }
          adventurePrice
          adventureTripLength
          adventurePrimaryImage {
            ... on ImageRef {
              _path
            }
          }
        }
      }
    }`;
    const res = await this.aemHeadlessClient.runQuery(query);
    return res;
  }

  async getAdventurePaths() {
    const res = await this.getAdventures();
    const adventures = res?.data?.adventureList?.items || [];
    const paths = adventures.map((item) => {
      const pathItems = item._path.split('/');
      return {
        params: {
          id: `${pathItems[pathItems.length - 2]}`,
        },
      };
    });
    return paths;
  }

  async getAdventureByPath(path) {
    const query = `{
      adventureByPath (_path: "${path}") {
        item {
          _path
            adventureTitle
            adventureActivity
            adventureType
            adventurePrice
            adventureTripLength
            adventureGroupSize
            adventureDifficulty
            adventurePrimaryImage {
              ... on ImageRef {
                _path
                mimeType
                width
                height
              }
            }
            adventureDescription {
              html
            }
            adventureItinerary {
              html
            }
        }
      }
    }
    `;
    const res = await this.aemHeadlessClient.runQuery(query);
    return res;
  }
}
