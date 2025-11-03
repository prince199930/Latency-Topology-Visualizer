import { ExchangeServer } from '@/types';

export const exchanges: ExchangeServer[] = [
  {
    id: 'binance-tokyo',
    name: 'Binance',
    location: 'Tokyo, Japan',
    latitude: 35.6762,
    longitude: 139.6503,
    cloudProvider: 'AWS',
    region: 'ap-northeast-1'
  },
  {
    id: 'binance-singapore',
    name: 'Binance',
    location: 'Singapore',
    latitude: 1.3521,
    longitude: 103.8198,
    cloudProvider: 'AWS',
    region: 'ap-southeast-1'
  },
  {
    id: 'okx-hongkong',
    name: 'OKX',
    location: 'Hong Kong',
    latitude: 22.3193,
    longitude: 114.1694,
    cloudProvider: 'GCP',
    region: 'asia-east2'
  },
  {
    id: 'okx-frankfurt',
    name: 'OKX',
    location: 'Frankfurt, Germany',
    latitude: 50.1109,
    longitude: 8.6821,
    cloudProvider: 'GCP',
    region: 'europe-west3'
  },
  {
    id: 'bybit-singapore',
    name: 'Bybit',
    location: 'Singapore',
    latitude: 1.3521,
    longitude: 103.8198,
    cloudProvider: 'Azure',
    region: 'southeastasia'
  },
  {
    id: 'bybit-virginia',
    name: 'Bybit',
    location: 'Virginia, USA',
    latitude: 37.4316,
    longitude: -78.6569,
    cloudProvider: 'Azure',
    region: 'eastus'
  },
  {
    id: 'deribit-amsterdam',
    name: 'Deribit',
    location: 'Amsterdam, Netherlands',
    latitude: 52.3676,
    longitude: 4.9041,
    cloudProvider: 'AWS',
    region: 'eu-west-1'
  },
  {
    id: 'deribit-tokyo',
    name: 'Deribit',
    location: 'Tokyo, Japan',
    latitude: 35.6762,
    longitude: 139.6503,
    cloudProvider: 'AWS',
    region: 'ap-northeast-1'
  },
  {
    id: 'kraken-newyork',
    name: 'Kraken',
    location: 'New York, USA',
    latitude: 40.7128,
    longitude: -74.0060,
    cloudProvider: 'GCP',
    region: 'us-east1'
  },
  {
    id: 'kraken-london',
    name: 'Kraken',
    location: 'London, UK',
    latitude: 51.5074,
    longitude: -0.1278,
    cloudProvider: 'GCP',
    region: 'europe-west2'
  },
  {
    id: 'coinbase-oregon',
    name: 'Coinbase',
    location: 'Oregon, USA',
    latitude: 45.5152,
    longitude: -122.6784,
    cloudProvider: 'AWS',
    region: 'us-west-2'
  },
  {
    id: 'coinbase-dublin',
    name: 'Coinbase',
    location: 'Dublin, Ireland',
    latitude: 53.3498,
    longitude: -6.2603,
    cloudProvider: 'AWS',
    region: 'eu-west-1'
  },
  {
    id: 'huobi-seoul',
    name: 'Huobi',
    location: 'Seoul, South Korea',
    latitude: 37.5665,
    longitude: 126.9780,
    cloudProvider: 'Azure',
    region: 'koreacentral'
  },
  {
    id: 'kucoin-mumbai',
    name: 'KuCoin',
    location: 'Mumbai, India',
    latitude: 19.0760,
    longitude: 72.8777,
    cloudProvider: 'GCP',
    region: 'asia-south1'
  },
  {
    id: 'bitfinex-paris',
    name: 'Bitfinex',
    location: 'Paris, France',
    latitude: 48.8566,
    longitude: 2.3522,
    cloudProvider: 'Azure',
    region: 'francecentral'
  }
];
