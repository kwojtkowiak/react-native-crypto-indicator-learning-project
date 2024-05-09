import { ExpoRequest, ExpoResponse } from 'expo-router/server'

const API_KEY = process.env.CRYPTO_API_KEY

export async function GET(request: ExpoRequest) {
  const ids = request.expoUrl.searchParams.get('ids')

  const response = await fetch(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${ids}`, {
    headers: {
      'X-CMC_PR0_API_KEY': API_KEY!,
    },
  })

  const res = await response.json()
  return ExpoResponse.json(res.data)
}

// {
//   "4": {
//     "id": 4,
//     "name": "Terracoin",
//     "symbol": "TRC",
//     "category": "coin",
//     "description": "Terracoin (TRC) is a cryptocurrency launched in 2012. Users are able to generate TRC through the process of mining. Terracoin has a current supply of 22,935,396.430361 with 0 in circulation. The last known price of Terracoin is 0.00201442 USD and is up 0.00 over the last 24 hours. More information can be found at http://www.terracoin.io/.",
//     "slug": "terracoin",
//     "logo": "https://s2.coinmarketcap.com/static/img/coins/64x64/4.png",
//     "subreddit": "terracoin",
//     "notice": "",
//     "tags": [
//       "mineable",
//       "pow",
//       "sha-256",
//       "masternodes"
//     ],
//     "tag-names": [
//       "Mineable",
//       "PoW",
//       "SHA-256",
//       "Masternodes"
//     ],
//     "tag-groups": [
//       "OTHERS",
//       "ALGORITHM",
//       "ALGORITHM",
//       "CATEGORY"
//     ],
//     "urls": {
//       "website": [
//         "http://www.terracoin.io/"
//       ],
//       "twitter": [
//         "https://twitter.com/Terracoin_TRC"
//       ],
//       "message_board": [
//         "https://medium.com/@clockuniverse"
//       ],
//       "chat": [
//         "https://mattermost.terracoin.io/",
//         "https://t.me/terracoin"
//       ],
//       "facebook": [],
//       "explorer": [
//         "https://insight.terracoin.io/",
//         "https://explorer.terracoin.io/chain/Terracoin"
//       ],
//       "reddit": [
//         "https://reddit.com/r/terracoin"
//       ],
//       "technical_doc": [
//         "https://wiki.terracoin.io/view/Whitepaper"
//       ],
//       "source_code": [
//         "https://github.com/terracoin"
//       ],
//       "announcement": [
//         "https://bitcointalk.org/index.php?topic=1364146.0"
//       ]
//     },
//     "platform": null,
//     "date_added": "2013-04-28T00:00:00.000Z",
//     "twitter_username": "Terracoin_TRC",
//     "is_hidden": 0,
//     "date_launched": "2012-10-26T00:00:00.000Z",
//     "contract_address": [],
//     "self_reported_circulating_supply": 22935396.430361,
//     "self_reported_tags": null,
//     "self_reported_market_cap": 0,
//     "infinite_supply": false
//   }
// }
