import { ExpoRequest, ExpoResponse } from 'expo-router/server'

const API_KEY = process.env.CRYPTO_API_KEY

export async function GET(request: Request) {
  // const url = new URL(request.url)
  // const params = new URLSearchParams(url.search)
  // const limit = params.get('limit') || 5

  // const response = await fetch(
  //   `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${limit}&convert=EUR`,
  //   {
  //     headers: {
  //       'X-CMC_PRO_API_KEY': API_KEY!,
  //     },
  //   }
  // )

  // const res = await response.json()
  // return Response.json(res.data)
  return Response.json(data)
}
const data = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    slug: 'bitcoin',
    num_market_pairs: 11041,
    date_added: '2010-07-13T00:00:00.000Z',
    tags: [
      'mineable',
      'pow',
      'sha-256',
      'store-of-value',
      'state-channel',
      'coinbase-ventures-portfolio',
      'three-arrows-capital-portfolio',
      'polychain-capital-portfolio',
      'binance-labs-portfolio',
      'blockchain-capital-portfolio',
      'boostvc-portfolio',
      'cms-holdings-portfolio',
      'dcg-portfolio',
      'dragonfly-capital-portfolio',
      'electric-capital-portfolio',
      'fabric-ventures-portfolio',
      'framework-ventures-portfolio',
      'galaxy-digital-portfolio',
      'huobi-capital-portfolio',
      'alameda-research-portfolio',
      'a16z-portfolio',
      '1confirmation-portfolio',
      'winklevoss-capital-portfolio',
      'usv-portfolio',
      'placeholder-ventures-portfolio',
      'pantera-capital-portfolio',
      'multicoin-capital-portfolio',
      'paradigm-portfolio',
      'bitcoin-ecosystem',
      'ftx-bankruptcy-estate',
    ],
    max_supply: 21000000,
    circulating_supply: 19696006,
    total_supply: 19696006,
    infinite_supply: false,
    platform: null,
    cmc_rank: 1,
    self_reported_circulating_supply: null,
    self_reported_market_cap: null,
    tvl_ratio: null,
    last_updated: '2024-05-09T16:57:00.000Z',
    quote: {
      EUR: {
        price: 57536.19853581233,
        volume_24h: 24250468495.980484,
        volume_change_24h: 2.4281,
        percent_change_1h: -0.11440437,
        percent_change_24h: -0.6023091,
        percent_change_7d: 4.95463485,
        percent_change_30d: -9.63186087,
        percent_change_60d: -10.95884707,
        percent_change_90d: 31.2096367,
        market_cap: 1133233311578.5508,
        market_cap_dominance: 53.2241,
        fully_diluted_market_cap: 1208260169252.0576,
        tvl: null,
        last_updated: '2024-05-09T16:56:05.000Z',
      },
    },
  },
  {
    id: 1027,
    name: 'Ethereum',
    symbol: 'ETH',
    slug: 'ethereum',
    num_market_pairs: 8906,
    date_added: '2015-08-07T00:00:00.000Z',
    tags: [
      'pos',
      'smart-contracts',
      'ethereum-ecosystem',
      'coinbase-ventures-portfolio',
      'three-arrows-capital-portfolio',
      'polychain-capital-portfolio',
      'binance-labs-portfolio',
      'blockchain-capital-portfolio',
      'boostvc-portfolio',
      'cms-holdings-portfolio',
      'dcg-portfolio',
      'dragonfly-capital-portfolio',
      'electric-capital-portfolio',
      'fabric-ventures-portfolio',
      'framework-ventures-portfolio',
      'hashkey-capital-portfolio',
      'kenetic-capital-portfolio',
      'huobi-capital-portfolio',
      'alameda-research-portfolio',
      'a16z-portfolio',
      '1confirmation-portfolio',
      'winklevoss-capital-portfolio',
      'usv-portfolio',
      'placeholder-ventures-portfolio',
      'pantera-capital-portfolio',
      'multicoin-capital-portfolio',
      'paradigm-portfolio',
      'injective-ecosystem',
      'layer-1',
      'ftx-bankruptcy-estate',
    ],
    max_supply: null,
    circulating_supply: 120105242.69583617,
    total_supply: 120105242.69583617,
    infinite_supply: true,
    platform: null,
    cmc_rank: 2,
    self_reported_circulating_supply: null,
    self_reported_market_cap: null,
    tvl_ratio: null,
    last_updated: '2024-05-09T16:56:00.000Z',
    quote: {
      EUR: {
        price: 2781.7446102879185,
        volume_24h: 10600190401.0901,
        volume_change_24h: -1.2369,
        percent_change_1h: -0.11779116,
        percent_change_24h: -0.47417266,
        percent_change_7d: 0.53043002,
        percent_change_30d: -14.33084979,
        percent_change_60d: -23.49326109,
        percent_change_90d: 20.63302952,
        market_cap: 334102111536.4646,
        market_cap_dominance: 15.6694,
        fully_diluted_market_cap: 334102111536.46875,
        tvl: null,
        last_updated: '2024-05-09T16:56:05.000Z',
      },
    },
  },
  {
    id: 825,
    name: 'Tether USDt',
    symbol: 'USDT',
    slug: 'tether',
    num_market_pairs: 85010,
    date_added: '2015-02-25T00:00:00.000Z',
    tags: [
      'stablecoin',
      'asset-backed-stablecoin',
      'avalanche-ecosystem',
      'solana-ecosystem',
      'arbitrum-ecosytem',
      'moonriver-ecosystem',
      'injective-ecosystem',
      'bnb-chain',
      'usd-stablecoin',
      'optimism-ecosystem',
    ],
    max_supply: null,
    circulating_supply: 110955976510.7959,
    total_supply: 113086550461.08403,
    platform: {
      id: 1027,
      name: 'Ethereum',
      symbol: 'ETH',
      slug: 'ethereum',
      token_address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    infinite_supply: true,
    cmc_rank: 3,
    self_reported_circulating_supply: null,
    self_reported_market_cap: null,
    tvl_ratio: null,
    last_updated: '2024-05-09T16:56:00.000Z',
    quote: {
      EUR: {
        price: 0.9277734615460708,
        volume_24h: 43987058577.37375,
        volume_change_24h: 4.1426,
        percent_change_1h: 0.00666469,
        percent_change_24h: -0.00761616,
        percent_change_7d: -0.04574574,
        percent_change_30d: -0.01605877,
        percent_change_60d: -0.20491471,
        percent_change_90d: -0.04239933,
        market_cap: 102942010406.64561,
        market_cap_dominance: 4.828,
        fully_diluted_market_cap: 104918700375.58058,
        tvl: null,
        last_updated: '2024-05-09T16:56:05.000Z',
      },
    },
  },
  {
    id: 1839,
    name: 'BNB',
    symbol: 'BNB',
    slug: 'bnb',
    num_market_pairs: 2155,
    date_added: '2017-07-25T00:00:00.000Z',
    tags: [
      'marketplace',
      'centralized-exchange',
      'payments',
      'smart-contracts',
      'alameda-research-portfolio',
      'multicoin-capital-portfolio',
      'bnb-chain',
      'layer-1',
      'sec-security-token',
      'alleged-sec-securities',
      'celsius-bankruptcy-estate',
    ],
    max_supply: null,
    circulating_supply: 147587070.57925275,
    total_supply: 147587070.57925275,
    infinite_supply: false,
    platform: null,
    cmc_rank: 4,
    self_reported_circulating_supply: null,
    self_reported_market_cap: null,
    tvl_ratio: null,
    last_updated: '2024-05-09T16:56:00.000Z',
    quote: {
      EUR: {
        price: 549.6570184033683,
        volume_24h: 1822708782.5681458,
        volume_change_24h: 25.7,
        percent_change_1h: -0.79221346,
        percent_change_24h: 1.51533355,
        percent_change_7d: 5.29528681,
        percent_change_30d: 2.7472165,
        percent_change_60d: 12.22535204,
        percent_change_90d: 83.5263397,
        market_cap: 81122269169.47954,
        market_cap_dominance: 3.8077,
        fully_diluted_market_cap: 81122269169.4801,
        tvl: null,
        last_updated: '2024-05-09T16:56:05.000Z',
      },
    },
  },
  {
    id: 5426,
    name: 'Solana',
    symbol: 'SOL',
    slug: 'solana',
    num_market_pairs: 657,
    date_added: '2020-04-10T00:00:00.000Z',
    tags: [
      'pos',
      'platform',
      'solana-ecosystem',
      'cms-holdings-portfolio',
      'kenetic-capital-portfolio',
      'alameda-research-portfolio',
      'multicoin-capital-portfolio',
      'okx-ventures-portfolio',
      'layer-1',
      'ftx-bankruptcy-estate',
      'sec-security-token',
      'alleged-sec-securities',
      'cmc-crypto-awards-2024',
    ],
    max_supply: null,
    circulating_supply: 448139943.99128777,
    total_supply: 575540699.1506808,
    infinite_supply: true,
    platform: null,
    cmc_rank: 5,
    self_reported_circulating_supply: null,
    self_reported_market_cap: null,
    tvl_ratio: null,
    last_updated: '2024-05-09T16:56:00.000Z',
    quote: {
      EUR: {
        price: 136.14655427630805,
        volume_24h: 2214519530.862313,
        volume_change_24h: 0.7135,
        percent_change_1h: 0.42972242,
        percent_change_24h: 0.68858246,
        percent_change_7d: 6.21734132,
        percent_change_30d: -15.68686318,
        percent_change_60d: 1.43240944,
        percent_change_90d: 40.04748198,
        market_cap: 61012709207.991516,
        market_cap_dominance: 2.8616,
        fully_diluted_market_cap: 78357883035.14119,
        tvl: null,
        last_updated: '2024-05-09T16:56:05.000Z',
      },
    },
  },
]
