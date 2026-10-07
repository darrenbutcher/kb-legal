export type Matter = { text: string; tag: string; value?: string };

export const caribbeanMatters: Matter[] = [
  {
    text: "Assisting Sygnus Deneb Investments Limited with its equity investment in Caribbean Maritime Investments.",
    tag: "EQUITY INVESTMENT",
  },
  {
    text: "Assisting Stichting Pensioenfonds Caribisch Nederland with the acquisitions of Breadline Plaza and Scout’s Place in Saba.",
    tag: "ACQUISITIONS · SABA",
  },
  {
    text: "Corporate counsel to EY Dutch Caribbean on a variety of matters.",
    tag: "CORPORATE COUNSEL",
  },
  {
    text: "Assisting pension fund Vidanova with the acquisition of SFT Bank.",
    tag: "BANK ACQUISITION",
  },
  {
    text: "Advising Execujet Aviation Group on its acquisition of St. Maarten-based fixed-base operator (FBO) TLC Aviation Corporation.",
    tag: "ACQUISITION · SINT MAARTEN",
  },
  {
    text: "Advising Citizen Watch Co., Ltd. on its acquisition of the Frederique Constant Group.",
    tag: "ACQUISITION",
  },
  {
    text: "Assisting Sint Maarten utility company GEBE with the division of its shares, which resulted in the country Sint Maarten becoming GEBE’s sole shareholder and the incorporation of two independent utility companies in Saba (SEC) and St. Eustatius (STUCO).",
    tag: "RESTRUCTURING",
  },
  {
    text: "Assisting Sun Alliance Insurance Overseas Ltd and Maduro & Curiel’s Bank on the sale of the shares in Royal & Sun Alliance Insurance (Antilles) to Fatum General Insurance N.V.",
    tag: "SHARE SALE · INSURANCE",
  },
];

export const internationalMatters: Matter[] = [
  {
    text: "Assisting Tele Atlas on the successful public offer made by TomTom.",
    value: "USD 4.5bn",
    tag: "PUBLIC OFFER",
  },
  {
    text: "Assisting Arcelor, as local Dutch counsel, on the successful public offer made by Mittal Steel.",
    value: "USD 33.8bn",
    tag: "PUBLIC OFFER",
  },
  {
    text: "Assisting Rocket Software on its successful public offer for Seagull Holding.",
    value: "USD 61m",
    tag: "PUBLIC OFFER",
  },
  {
    text: "Assisting Bloomberg on its successful public offer for Brainpower and the subsequent squeeze-out proceedings.",
    value: "EUR 33.1m",
    tag: "PUBLIC OFFER · SQUEEZE-OUT",
  },
  {
    text: "Assisting Fortis Bank (Nederland) N.V. on the offering of ordinary shares by Accsys Technologies Plc and certain selling shareholders, and the listing of its ordinary shares on Euronext Amsterdam.",
    value: "Euronext",
    tag: "OFFERING · LISTING",
  },
  {
    text: "Assisting Fortis Bank (Nederland) N.V. on the proposed IPO of Avantium Holding N.V. on Euronext Amsterdam (aborted).",
    value: "Euronext",
    tag: "IPO",
  },
  {
    text: "Assisting Nanette Real Estate Group with its IPO and listing on the London Stock Exchange’s AIM market.",
    value: "LSE · AIM",
    tag: "IPO · LISTING",
  },
];

export const matterCount =
  caribbeanMatters.length + internationalMatters.length;
