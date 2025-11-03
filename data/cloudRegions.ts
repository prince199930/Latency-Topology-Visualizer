import { CloudRegion } from '@/types';

export const cloudRegions: CloudRegion[] = [
  {
    id: 'aws-ap-northeast-1',
    provider: 'AWS',
    name: 'Asia Pacific (Tokyo)',
    code: 'ap-northeast-1',
    latitude: 35.6762,
    longitude: 139.6503,
    serverCount: 2
  },
  {
    id: 'aws-ap-southeast-1',
    provider: 'AWS',
    name: 'Asia Pacific (Singapore)',
    code: 'ap-southeast-1',
    latitude: 1.3521,
    longitude: 103.8198,
    serverCount: 1
  },
  {
    id: 'aws-eu-west-1',
    provider: 'AWS',
    name: 'Europe (Ireland)',
    code: 'eu-west-1',
    latitude: 53.3498,
    longitude: -6.2603,
    serverCount: 2
  },
  {
    id: 'aws-us-west-2',
    provider: 'AWS',
    name: 'US West (Oregon)',
    code: 'us-west-2',
    latitude: 45.5152,
    longitude: -122.6784,
    serverCount: 1
  },
  {
    id: 'gcp-asia-east2',
    provider: 'GCP',
    name: 'Hong Kong',
    code: 'asia-east2',
    latitude: 22.3193,
    longitude: 114.1694,
    serverCount: 1
  },
  {
    id: 'gcp-europe-west3',
    provider: 'GCP',
    name: 'Frankfurt',
    code: 'europe-west3',
    latitude: 50.1109,
    longitude: 8.6821,
    serverCount: 1
  },
  {
    id: 'gcp-us-east1',
    provider: 'GCP',
    name: 'South Carolina',
    code: 'us-east1',
    latitude: 33.8361,
    longitude: -81.1637,
    serverCount: 1
  },
  {
    id: 'gcp-europe-west2',
    provider: 'GCP',
    name: 'London',
    code: 'europe-west2',
    latitude: 51.5074,
    longitude: -0.1278,
    serverCount: 1
  },
  {
    id: 'gcp-asia-south1',
    provider: 'GCP',
    name: 'Mumbai',
    code: 'asia-south1',
    latitude: 19.0760,
    longitude: 72.8777,
    serverCount: 1
  },
  {
    id: 'azure-southeastasia',
    provider: 'Azure',
    name: 'Southeast Asia',
    code: 'southeastasia',
    latitude: 1.3521,
    longitude: 103.8198,
    serverCount: 1
  },
  {
    id: 'azure-eastus',
    provider: 'Azure',
    name: 'East US',
    code: 'eastus',
    latitude: 37.3719,
    longitude: -79.8164,
    serverCount: 1
  },
  {
    id: 'azure-koreacentral',
    provider: 'Azure',
    name: 'Korea Central',
    code: 'koreacentral',
    latitude: 37.5665,
    longitude: 126.9780,
    serverCount: 1
  },
  {
    id: 'azure-francecentral',
    provider: 'Azure',
    name: 'France Central',
    code: 'francecentral',
    latitude: 46.3772,
    longitude: 2.3730,
    serverCount: 1
  }
];
