export const policeStations = [
  {
    "police_station": "那覇警察署",
    "address": "那覇市与儀1丁目2-9",
    "phone": "098-836-0110",
    "jurisdiction": ["那覇市"],
    "region": "南部"
  },
  {
    "police_station": "豊見城警察署",
    "address": "豊見城市瀬長17-8",
    "phone": "098-850-0110",
    "jurisdiction": ["豊見城市"],
    "region": "南部"
  },
  {
    "police_station": "糸満警察署",
    "address": "糸満市字糸満1736-6",
    "phone": "098-995-0110",
    "jurisdiction": ["糸満市", "島尻郡八重瀬町"],
    "region": "南部"
  },
  {
    "police_station": "与那原警察署",
    "address": "島尻郡与那原町与那原3085",
    "phone": "098-945-0110",
    "jurisdiction": ["南城市", "島尻郡与那原町", "島尻郡南風原町"],
    "region": "南部"
  },
  {
    "police_station": "浦添警察署",
    "address": "浦添市仲間2丁目51-1",
    "phone": "098-875-0110",
    "jurisdiction": ["浦添市", "中頭郡西原町", "中頭郡中城村（一部）"],
    "region": "中部"
  },
  {
    "police_station": "宜野湾警察署",
    "address": "宜野湾市大山7丁目2770-7",
    "phone": "098-898-0110",
    "jurisdiction": ["宜野湾市", "中頭郡中城村（一部）"],
    "region": "中部"
  },
  {
    "police_station": "沖縄警察署",
    "address": "沖縄市山里2丁目4-20",
    "phone": "098-932-0110",
    "jurisdiction": ["沖縄市", "中頭郡北谷町", "中頭郡北中城村"],
    "region": "中部"
  },
  {
    "police_station": "嘉手納警察署",
    "address": "嘉手納町嘉手納560",
    "phone": "098-956-0110",
    "jurisdiction": ["中頭郡嘉手納町", "中頭郡読谷村"],
    "region": "中部"
  },
  {
    "police_station": "うるま警察署",
    "address": "うるま市大田100",
    "phone": "098-973-0110",
    "jurisdiction": ["うるま市"],
    "region": "中部"
  },
  {
    "police_station": "石川警察署",
    "address": "うるま市石川東山本町1丁目1-1",
    "phone": "098-964-4110",
    "jurisdiction": ["うるま市石川地区", "国頭郡金武町", "国頭郡恩納村", "国頭郡宜野座村"],
    "region": "北部"
  },
  {
    "police_station": "名護警察署",
    "address": "名護市東江5丁目21-9",
    "phone": "0980-52-0110",
    "jurisdiction": ["名護市", "国頭郡国頭村", "国頭郡大宜味村", "国頭郡東村"],
    "region": "北部"
  },
  {
    "police_station": "本部警察署",
    "address": "本部町大浜850-1",
    "phone": "0980-47-4110",
    "jurisdiction": ["国頭郡本部町", "国頭郡今帰仁村", "国頭郡伊江村", "島尻郡伊平屋村", "島尻郡伊是名村"],
    "region": "北部"
  },
  {
    "police_station": "宮古島警察署",
    "address": "宮古島市平良西里1092-1",
    "phone": "0980-72-0110",
    "jurisdiction": ["宮古島市", "宮古郡多良間村"],
    "region": "離島"
  },
  {
    "police_station": "八重山警察署",
    "address": "石垣市登野城894-1",
    "phone": "0980-82-0110",
    "jurisdiction": ["石垣市", "八重山郡竹富町", "八重山郡与那国町"],
    "region": "離島"
  }
];

// Approximate coordinates for the police stations
export const stationLocations: StationLocation[] = [
  { name: "那覇警察署", lat: 26.2178, lng: 127.6856 },
  { name: "豊見城警察署", lat: 26.1614, lng: 127.6689 },
  { name: "糸満警察署", lat: 26.1233, lng: 127.6656 },
  { name: "与那原警察署", lat: 26.1989, lng: 127.7544 },
  { name: "浦添警察署", lat: 26.2456, lng: 127.6856 },
  { name: "宜野湾警察署", lat: 26.2811, lng: 127.7783 },
  { name: "沖縄警察署", lat: 26.3344, lng: 127.8056 },
  { name: "嘉手納警察署", lat: 26.3617, lng: 127.7544 },
  { name: "うるま警察署", lat: 26.3789, lng: 127.8575 },
  { name: "石川警察署", lat: 26.4256, lng: 127.8233 },
  { name: "名護警察署", lat: 26.5911, lng: 127.9775 },
  { name: "本部警察署", lat: 26.6917, lng: 127.8806 },
  { name: "宮古島警察署", lat: 24.8056, lng: 125.2808 },
  { name: "八重山警察署", lat: 24.3667, lng: 124.1556 }
];

// Region colors inspired by Okinawa's tropical nature
export const regionColors = {
  "北部": "#2E8B57", // Tropical forest green
  "中部": "#0088A3", // Deeper ocean blue
  "南部": "#FF7F50", // Coral orange
  "離島": "#9370DB"  // Tropical sunset purple
};

// Get station color based on its region
export const getStationColor = (station: string) => {
  const stationData = policeStations.find(s => s.police_station === station);
  return stationData ? regionColors[stationData.region] : "#000000";
};