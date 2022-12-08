/// Home Screen ///
// Route:
//  <URL>/home
// Description:
//  This screen contains the components redenred to the user when they first visit the page

/// Imports ///
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import NewsArticleCard from '../../components/newsComponents/newsArticleCard/NewsArticleCard';
import ChartCardESG from '../../components/stockVisualisationComponents/ChartCard/ChartCard(ESG)';
import ChartCard from '../../components/stockVisualisationComponents/ChartCard/ChartCard';
import SplashCarousel from '../../components/widgets/Carousel/SplashCarousel';
import TickerCard from '../../components/stockDiscoveryComponents/tickercard/Tickercard';
import SideScrollMenu from '../../components/widgets/SideScrollMenu/SideScrollMenu';
import Footer from '../../components/layout/Footer/footer'

function HomeScreen() {
  const navigate = useNavigate();

  /// When user clicks "Play" button
  const navigateLogin = (e) => {
    e.preventDefault();
    navigate(`/login`);
  };

  var articles = [
    {
      headline:
        "Apple plans to give 25% wage increase",
      source: 'Sky News',
      link: 'https://news.sky.com/story/jacob-rees-mogg-says-he-has-confidence-in-b…1',
      category: 'Business',
      description:
        'Jacob Rees-Mogg has declared his confidence in the governor of the Ban…',
      image:
        'https://images.unsplash.com/photo-1579693409321-1be2df1ab130?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGUlMjBpbmN8ZW58MHx8MHx8&w=1000&q=80',
      pubDate: '2022-10-13T06:22:00.000+00:00',
      sentiment: 'positive',
    },
    {
      headline:
        "Rumours that Apple are insolvent labelled 'concerning' by analysts",
      source: 'Sky News',
      link: 'https://news.sky.com/story/jacob-rees-mogg-says-he-has-confidence-in-b…2',
      category: 'Business',
      description:
        'Jacob Rees-Mogg has declared his confidence in the governor of the Ban…',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Aerial_view_of_Apple_Park_dllu.jpg/1200px-Aerial_view_of_Apple_Park_dllu.jpg',
      pubDate: '2022-10-14T06:22:00.000+00:00',
      sentiment: 'negative',
    },
    {
      headline:
        "Apple's advertising relationship with twitter brought into question",
      source: 'Sky News',
      link: 'https://news.sky.com/story/jacob-rees-mogg-says-he-has-confidence-in-b…3',
      category: 'Business',
      description:
        'Jacob Rees-Mogg has declared his confidence in the governor of the Ban…',
      image:
        'https://st3.depositphotos.com/1022914/16288/i/1600/depositphotos_162882208-stock-photo-apple-inc-logo-on-the.jpg',
      pubDate: '2022-10-15T06:22:00.000+00:00',
      sentiment: 'neutral',
    },
    {
      headline:
        "Apple to lay off 30% of staff",
      source: 'Sky News',
      link: 'https://news.sky.com/story/jacob-rees-mogg-says-he-has-confidence-in-b…4',
      category: 'Business',
      description:
        'Jacob Rees-Mogg has declared his confidence in the governor of the Ban…',
      image:
        'https://image.cnbcfm.com/api/v1/image/106941688-1631644205737-AppleEventSEP14KeynoteTim_Cook02.jpg?v=1631795513&w=1920&h=1080',
      pubDate: '2022-10-16T06:22:00.000+00:00',
      sentiment: 'negative',
    },
  ];

  const stockSentimentData = [
    { name: 'Positive', value: 100 },
    { name: 'Negative', value: 98 },
    { name: 'Neutral', value: 26 },
  ];

  var stocks = [
    {
      _id: {
        $oid: '63457b69e940127420948dd0',
      },
      idnumber: '326',
      exchange: 'NMS',
      symbol: 'NVDA',
      shortname: 'NVIDIA Corporation',
      longname: 'NVIDIA Corporation',
      longnamesort: 'NVIDIACorporation',
      sector: 'Technology',
      industry: 'Semiconductors',
      marketcap: '3.33E+11',
      ebitda: '12533000192',
      revenuegrowth: '0.464',
      city: 'Santa Clara',
      state: 'CA',
      country: 'United States',
      fulltimeemployees: '22473',
      longbusinesssummary:
        "NVIDIA Corporation provides graphics, and compute and networking solutions in the United States, Taiwan, China, and internationally. The company's Graphics segment offers GeForce GPUs for gaming and PCs, the GeForce NOW game streaming service and related infrastructure, and solutions for gaming platforms; Quadro/NVIDIA RTX GPUs for enterprise workstation graphics; vGPU software for cloud-based visual and virtual computing; automotive platforms for infotainment systems; and Omniverse software for building 3D designs and virtual worlds. Its Compute & Networking segment provides Data Center platforms and systems for AI, HPC, and accelerated computing; Mellanox networking and interconnect solutions; automotive AI Cockpit, autonomous driving development agreements, and autonomous vehicle solutions; cryptocurrency mining processors; Jetson for robotics and other embedded platforms; and NVIDIA AI Enterprise and other software. The company's products are used in gaming, professional visualization, datacenter, and automotive markets. NVIDIA Corporation sells its products to original equipment manufacturers, original device manufacturers, system builders, add-in board manufacturers, retailers/distributors, independent software vendors, Internet and cloud service providers, automotive manufacturers and tier-1 automotive suppliers, mapping companies, start-ups, and other ecosystem participants. It has a strategic collaboration with Kroger Co. NVIDIA Corporation was incorporated in 1993 and is headquartered in Santa Clara, California.",
      weight: '0.009622173',
      esgrating: {
        environment_score: 449,
        social_score: 451,
        governance_score: 578,
        total: 899,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/nvidiacorporation0.png',
      daily_change: {
        currentprice: 168.89,
        absoluteChange: -0.34,
        percentageChange: -0.2,
      },
    },
    {
      _id: {
        $oid: '63457b65e940127420948c8b',
      },
      idnumber: '1',
      exchange: 'NYQ',
      symbol: 'MMM',
      shortname: '3M Company',
      longname: '3M Company',
      longnamesort: '3MCompany',
      sector: 'Industrials',
      industry: 'Conglomerates',
      marketcap: '64573538304',
      ebitda: '8615999488',
      revenuegrowth: '-0.028',
      city: 'Saint Paul',
      state: 'MN',
      country: 'United States',
      fulltimeemployees: 95000,
      longbusinesssummary:
        '3M Company operates as a diversified technology company worldwide. It operates through four segments: Safety and Industrial; Transportation and Electronics; Health Care; and Consumer. The Safety and Industrial segment offers industrial abrasives and finishing for metalworking applications; autobody repair solutions; closure systems for personal hygiene products, masking, and packaging materials; electrical products and materials for construction and maintenance, power distribution, and electrical original equipment manufacturers; structural adhesives and tapes; respiratory, hearing, eye, and fall protection solutions; and natural and color-coated mineral granules for shingles. The Transportation and Electronics segment provides ceramic solutions; attachment tapes, films, sound, and temperature management for transportation vehicles; premium large format graphic films for advertising and fleet signage; light management films and electronics assembly solutions; packaging and interconnection solutions; and reflective signage for highway, and vehicle safety. The Healthcare segment offers food safety indicator solutions; health care procedure coding and reimbursement software; skin, wound care, and infection prevention products and solutions; dentistry and orthodontia solutions; and filtration and purification systems. The Consumer segment provides consumer bandages, braces, supports and consumer respirators; cleaning products for the home; retail abrasives, paint accessories, car care DIY products, picture hanging, and consumer air quality solutions; and stationery products. It offers its products through e-commerce and traditional wholesalers, retailers, jobbers, distributors, and dealers. The company was founded in 1902 and is based in St. Paul, Minnesota.',
      weight: '0.001863197',
      esgrating: {
        environment_score: 731,
        social_score: 464,
        governance_score: 642,
        total: 1141,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/3mcompany0.png',
      daily_change: {
        currentprice: 122.48,
        absoluteChange: -3.65,
        percentageChange: -2.89,
      },
    },
    {
      _id: {
        $oid: '63457b65e940127420948c8c',
      },
      idnumber: '2',
      exchange: 'NYQ',
      symbol: 'ABT',
      shortname: 'Abbott Laboratories',
      longname: 'Abbott Laboratories',
      longnamesort: 'AbbottLaboratories',
      sector: 'Healthcare',
      industry: 'Medical Devices',
      marketcap: '1.82E+11',
      ebitda: '13950999552',
      revenuegrowth: '0.101',
      city: 'North Chicago',
      state: 'IL',
      country: 'United States',
      fulltimeemployees: 113000,
      longbusinesssummary:
        "Abbott Laboratories, together with its subsidiaries, discovers, develops, manufactures, and sells health care products worldwide. It operates in four segments: Established Pharmaceutical Products, Diagnostic Products, Nutritional Products, and Medical Devices. The Established Pharmaceutical Products segment provides generic pharmaceuticals for the treatment of pancreatic exocrine insufficiency, irritable bowel syndrome or biliary spasm, intrahepatic cholestasis or depressive symptoms, gynecological disorder, hormone replacement therapy, dyslipidemia, hypertension, hypothyroidism, MÃ©niÃ¨re's disease and vestibular vertigo, pain, fever, inflammation, and migraine, as well as provides anti-infective clarithromycin, influenza vaccine, and products to regulate physiological rhythm of the colon. The Diagnostic Products segment offers laboratory systems in the areas of immunoassay, clinical chemistry, hematology, and transfusion; molecular diagnostics systems that automate the extraction, purification, and preparation of DNA and RNA from patient samples, as well as detect and measure infectious agents; point of care systems; cartridges for testing blood; rapid diagnostics lateral flow testing products; molecular point-of-care testing for HIV, SARS-CoV-2, influenza A and B, RSV, and strep A; cardiometabolic test systems; drug and alcohol test, and remote patient monitoring and consumer self-test systems; and informatics and automation solutions for use in laboratories. The Nutritional Products segment provides pediatric and adult nutritional products. The Medical Devices segment offers rhythm management, electrophysiology, heart failure, vascular, and structural heart devices for the treatment of cardiovascular diseases; and diabetes care products, as well as neuromodulation devices for the management of chronic pain and movement disorders. Abbott Laboratories was founded in 1888 and is based in North Chicago, Illinois.",
      weight: '0.005259613',
      esgrating: {
        environment_score: 716,
        social_score: 457,
        governance_score: 642,
        total: 1125,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/abbottlaboratories0.png',
      daily_change: {
        currentprice: 104.02,
        absoluteChange: -0.99,
        percentageChange: -0.94,
      },
    },
    {
      _id: {
        $oid: '63457b65e940127420948cb3',
      },
      idnumber: '41',
      exchange: 'NMS',
      symbol: 'AAPL',
      shortname: 'Apple Inc.',
      longname: 'Apple Inc.',
      longnamesort: 'AppleInc',
      sector: 'Technology',
      industry: 'Consumer Electronics',
      marketcap: '2.53E+12',
      ebitda: '1.30E+11',
      revenuegrowth: '0.019',
      city: 'Cupertino',
      state: 'CA',
      country: 'United States',
      fulltimeemployees: '154000',
      longbusinesssummary:
        'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services. In addition, the company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; AirPods Max, an over-ear wireless headphone; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, HomePod, and iPod touch. Further, it provides AppleCare support services; cloud services store services; and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts. Additionally, the company offers various services, such as Apple Arcade, a game subscription service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It distributes third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was incorporated in 1977 and is headquartered in Cupertino, California.',
      weight: '0.073129',
      esgrating: {
        environment_score: 493,
        social_score: 421,
        governance_score: 536,
        total: 891,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/appleinc0.png',
      daily_change: {
        currentprice: 141.51,
        absoluteChange: 0.34,
        percentageChange: 0.24,
      },
    },
    {
      _id: {
        $oid: '63457b65e940127420948ca1',
      },
      idnumber: '23',
      exchange: 'NMS',
      symbol: 'AMZN',
      shortname: 'Amazon.com, Inc.',
      longname: 'Amazon.com, Inc.',
      longnamesort: 'AmazoncomInc',
      sector: 'Consumer Cyclical',
      industry: 'Internet Retail',
      marketcap: '1.27E+12',
      ebitda: '52620001280',
      revenuegrowth: '0.072',
      city: 'Seattle',
      state: 'WA',
      country: 'United States',
      fulltimeemployees: '1523000',
      longbusinesssummary:
        'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally. The company operates through three segments: North America, International, and Amazon Web Services (AWS). It sells merchandise and content purchased for resale from third-party sellers through physical and online stores. The company also manufactures and sells electronic devices, including Kindle, Fire tablets, Fire TVs, Rings, and Echo and other devices; provides Kindle Direct Publishing, an online service that allows independent authors and publishers to make their books available in the Kindle Store; and develops and produces media content. In addition, it offers programs that enable sellers to sell their products on its websites, as well as its stores; and programs that allow authors, musicians, filmmakers, Twitch streamers, skill and app developers, and others to publish and sell content. Further, the company provides compute, storage, database, analytics, machine learning, and other services, as well as fulfillment, advertising, publishing, and digital content subscriptions. Additionally, it offers Amazon Prime, a membership program, which provides free shipping of various items; access to streaming of movies and series; and other services. The company serves consumers, sellers, developers, enterprises, and content creators. Amazon.com, Inc. was incorporated in 1994 and is headquartered in Seattle, Washington.',
      weight: '0.036644019',
      esgrating: {
        environment_score: 931,
        social_score: 452,
        governance_score: 947,
        total: 1422,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/amazoncominc0.png',
      daily_change: {
        currentprice: 92.12,
        absoluteChange: -0.31,
        percentageChange: -0.33,
      },
    },
    {
      _id: {
        $oid: '63457b6ae940127420948e24',
      },
      idnumber: '410',
      exchange: 'NMS',
      symbol: 'TSLA',
      shortname: 'Tesla, Inc.',
      longname: 'Tesla, Inc.',
      longnamesort: 'TeslaInc',
      sector: 'Consumer Cyclical',
      industry: 'Auto Manufacturers',
      marketcap: '3.10E+11',
      ebitda: '14030000128',
      revenuegrowth: '0.416',
      city: 'Austin',
      state: 'TX',
      country: 'United States',
      fulltimeemployees: '99290',
      longbusinesssummary:
        'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally. The company operates in two segments, Automotive, and Energy Generation and Storage. The Automotive segment offers electric vehicles, as well as sells automotive regulatory credits. It provides sedans and sport utility vehicles through direct and used vehicle sales, a network of Tesla Superchargers, and in-app upgrades; and purchase financing and leasing services. This segment is also involved in the provision of non-warranty after-sales vehicle services, sale of used vehicles, retail merchandise, and vehicle insurance, as well as sale of products to third party customers; services for electric vehicles through its company-owned service locations, and Tesla mobile service technicians; and vehicle limited warranties and extended service plans. The Energy Generation and Storage segment engages in the design, manufacture, installation, sale, and leasing of solar energy generation and energy storage products, and related services to residential, commercial, and industrial customers and utilities through its website, stores, and galleries, as well as through a network of channel partners. This segment also offers service and repairs to its energy product customers, including under warranty; and various financing options to its solar customers. The company was formerly known as Tesla Motors, Inc. and changed its name to Tesla, Inc. in February 2017. Tesla, Inc. was incorporated in 2003 and is headquartered in Austin, Texas.',
      weight: '0.008955856',
      esgrating: {
        environment_score: 771,
        social_score: 239,
        governance_score: 585,
        total: 993,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/teslainc0.png',
      daily_change: {
        currentprice: 182.32,
        absoluteChange: 1.49,
        percentageChange: 0.82,
      },
    },
    {
      _id: {
        $oid: '63457b68e940127420948db0',
      },
      idnumber: '294',
      exchange: 'NMS',
      symbol: 'MSFT',
      shortname: 'Microsoft Corporation',
      longname: 'Microsoft Corporation',
      longnamesort: 'MicrosoftCorporation',
      sector: 'Technology',
      industry: 'Softwareâ€”Infrastructure',
      marketcap: '1.84E+12',
      ebitda: '97982996480',
      revenuegrowth: '0.124',
      city: 'Redmond',
      state: 'WA',
      country: 'United States',
      fulltimeemployees: '221000',
      longbusinesssummary:
        'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates in three segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing. The Productivity and Business Processes segment offers Office, Exchange, SharePoint, Microsoft Teams, Office 365 Security and Compliance, Microsoft Viva, and Skype for Business; Skype, Outlook.com, OneDrive, and LinkedIn; and Dynamics 365, a set of cloud-based and on-premises business solutions for organizations and enterprise divisions. The Intelligent Cloud segment licenses SQL, Windows Servers, Visual Studio, System Center, and related Client Access Licenses; GitHub that provides a collaboration platform and code hosting service for developers; Nuance provides healthcare and enterprise AI solutions; and Azure, a cloud platform. It also offers enterprise support, Microsoft consulting, and nuance professional services to assist customers in developing, deploying, and managing Microsoft server and desktop solutions; and training and certification on Microsoft products. The More Personal Computing segment provides Windows original equipment manufacturer (OEM) licensing and other non-volume licensing of the Windows operating system; Windows Commercial, such as volume licensing of the Windows operating system, Windows cloud services, and other Windows commercial offerings; patent licensing; and Windows Internet of Things. It also offers Surface, PC accessories, PCs, tablets, gaming and entertainment consoles, and other devices; Gaming, including Xbox hardware, and Xbox content and services; video games and third-party video game royalties; and Search, including Bing and Microsoft advertising. The company sells its products through OEMs, distributors, and resellers; and directly through digital marketplaces, online stores, and retail stores. Microsoft Corporation was founded in 1975 and is headquartered in Redmond, Washington.',
      weight: '0.052971413',
      esgrating: {
        environment_score: 994,
        social_score: 664,
        governance_score: 789,
        total: 1533,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/microsoftcorporation0.jpeg',
      daily_change: {
        currentprice: 241.79,
        absoluteChange: 1.46,
        percentageChange: 0.61,
      },
    },
    {
      _id: {
        $oid: '63457b65e940127420948c93',
      },
      idnumber: '9',
      exchange: 'NMS',
      symbol: 'AMD',
      shortname: 'Advanced Micro Devices, Inc.',
      longname: 'Advanced Micro Devices, Inc.',
      longnamesort: 'AdvancedMicroDevicesInc',
      sector: 'Technology',
      industry: 'Semiconductors',
      marketcap: '92708216832',
      ebitda: '4857999872',
      revenuegrowth: '0.709',
      city: 'Santa Clara',
      state: 'CA',
      country: 'United States',
      fulltimeemployees: '15500',
      longbusinesssummary:
        'Advanced Micro Devices, Inc. operates as a semiconductor company worldwide. The company operates in two segments, Computing and Graphics; and Enterprise, Embedded and Semi-Custom. Its products include x86 microprocessors as an accelerated processing unit, chipsets, discrete and integrated graphics processing units (GPUs), data center and professional GPUs, and development services; and server and embedded processors, and semi-custom System-on-Chip (SoC) products, development services, and technology for game consoles. The company provides processors for desktop and notebook personal computers under the AMD Ryzen, AMD Ryzen PRO, Ryzen Threadripper, Ryzen Threadripper PRO, AMD Athlon, AMD Athlon PRO, AMD FX, AMD A-Series, and AMD PRO A-Series processors brands; discrete GPUs for desktop and notebook PCs under the AMD Radeon graphics, AMD Embedded Radeon graphics brands; and professional graphics products under the AMD Radeon Pro and AMD FirePro graphics brands. It also offers Radeon Instinct, Radeon PRO V-series, and AMD Instinct accelerators for servers; chipsets under the AMD trademark; microprocessors for servers under the AMD EPYC; embedded processor solutions under the AMD Athlon, AMD Geode, AMD Ryzen, AMD EPYC, AMD R-Series, and G-Series processors brands; and customer-specific solutions based on AMD CPU, GPU, and multi-media technologies, as well as semi-custom SoC products. It serves original equipment manufacturers, public cloud service providers, original design manufacturers, system integrators, independent distributors, online retailers, and add-in-board manufacturers through its direct sales force, independent distributors, and sales representatives. The company was incorporated in 1969 and is headquartered in Santa Clara, California.',
      weight: '0.002674991',
      esgrating: {
        environment_score: 278,
        social_score: 311,
        governance_score: 421,
        total: 608,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/advancedmicrodevicesinc0.png',
      daily_change: {
        currentprice: 78.2,
        absoluteChange: 4.81,
        percentageChange: 6.55,
      },
    },
    {
      _id: {
        $oid: '63457b69e940127420948dd0',
      },
      idnumber: '326',
      exchange: 'NMS',
      symbol: 'NVDA',
      shortname: 'NVIDIA Corporation',
      longname: 'NVIDIA Corporation',
      longnamesort: 'NVIDIACorporation',
      sector: 'Technology',
      industry: 'Semiconductors',
      marketcap: '3.33E+11',
      ebitda: '12533000192',
      revenuegrowth: '0.464',
      city: 'Santa Clara',
      state: 'CA',
      country: 'United States',
      fulltimeemployees: '22473',
      longbusinesssummary:
        "NVIDIA Corporation provides graphics, and compute and networking solutions in the United States, Taiwan, China, and internationally. The company's Graphics segment offers GeForce GPUs for gaming and PCs, the GeForce NOW game streaming service and related infrastructure, and solutions for gaming platforms; Quadro/NVIDIA RTX GPUs for enterprise workstation graphics; vGPU software for cloud-based visual and virtual computing; automotive platforms for infotainment systems; and Omniverse software for building 3D designs and virtual worlds. Its Compute & Networking segment provides Data Center platforms and systems for AI, HPC, and accelerated computing; Mellanox networking and interconnect solutions; automotive AI Cockpit, autonomous driving development agreements, and autonomous vehicle solutions; cryptocurrency mining processors; Jetson for robotics and other embedded platforms; and NVIDIA AI Enterprise and other software. The company's products are used in gaming, professional visualization, datacenter, and automotive markets. NVIDIA Corporation sells its products to original equipment manufacturers, original device manufacturers, system builders, add-in board manufacturers, retailers/distributors, independent software vendors, Internet and cloud service providers, automotive manufacturers and tier-1 automotive suppliers, mapping companies, start-ups, and other ecosystem participants. It has a strategic collaboration with Kroger Co. NVIDIA Corporation was incorporated in 1993 and is headquartered in Santa Clara, California.",
      weight: '0.009622173',
      esgrating: {
        environment_score: 449,
        social_score: 451,
        governance_score: 578,
        total: 899,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/nvidiacorporation0.png',
      daily_change: {
        currentprice: 168.89,
        absoluteChange: -0.34,
        percentageChange: -0.2,
      },
    },
    {
      _id: {
        $oid: '63457b65e940127420948c8b',
      },
      idnumber: '1',
      exchange: 'NYQ',
      symbol: 'MMM',
      shortname: '3M Company',
      longname: '3M Company',
      longnamesort: '3MCompany',
      sector: 'Industrials',
      industry: 'Conglomerates',
      marketcap: '64573538304',
      ebitda: '8615999488',
      revenuegrowth: '-0.028',
      city: 'Saint Paul',
      state: 'MN',
      country: 'United States',
      fulltimeemployees: 95000,
      longbusinesssummary:
        '3M Company operates as a diversified technology company worldwide. It operates through four segments: Safety and Industrial; Transportation and Electronics; Health Care; and Consumer. The Safety and Industrial segment offers industrial abrasives and finishing for metalworking applications; autobody repair solutions; closure systems for personal hygiene products, masking, and packaging materials; electrical products and materials for construction and maintenance, power distribution, and electrical original equipment manufacturers; structural adhesives and tapes; respiratory, hearing, eye, and fall protection solutions; and natural and color-coated mineral granules for shingles. The Transportation and Electronics segment provides ceramic solutions; attachment tapes, films, sound, and temperature management for transportation vehicles; premium large format graphic films for advertising and fleet signage; light management films and electronics assembly solutions; packaging and interconnection solutions; and reflective signage for highway, and vehicle safety. The Healthcare segment offers food safety indicator solutions; health care procedure coding and reimbursement software; skin, wound care, and infection prevention products and solutions; dentistry and orthodontia solutions; and filtration and purification systems. The Consumer segment provides consumer bandages, braces, supports and consumer respirators; cleaning products for the home; retail abrasives, paint accessories, car care DIY products, picture hanging, and consumer air quality solutions; and stationery products. It offers its products through e-commerce and traditional wholesalers, retailers, jobbers, distributors, and dealers. The company was founded in 1902 and is based in St. Paul, Minnesota.',
      weight: '0.001863197',
      esgrating: {
        environment_score: 731,
        social_score: 464,
        governance_score: 642,
        total: 1141,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/3mcompany0.png',
      daily_change: {
        currentprice: 122.48,
        absoluteChange: -3.65,
        percentageChange: -2.89,
      },
    },
    {
      _id: {
        $oid: '63457b65e940127420948c8c',
      },
      idnumber: '2',
      exchange: 'NYQ',
      symbol: 'ABT',
      shortname: 'Abbott Laboratories',
      longname: 'Abbott Laboratories',
      longnamesort: 'AbbottLaboratories',
      sector: 'Healthcare',
      industry: 'Medical Devices',
      marketcap: '1.82E+11',
      ebitda: '13950999552',
      revenuegrowth: '0.101',
      city: 'North Chicago',
      state: 'IL',
      country: 'United States',
      fulltimeemployees: 113000,
      longbusinesssummary:
        "Abbott Laboratories, together with its subsidiaries, discovers, develops, manufactures, and sells health care products worldwide. It operates in four segments: Established Pharmaceutical Products, Diagnostic Products, Nutritional Products, and Medical Devices. The Established Pharmaceutical Products segment provides generic pharmaceuticals for the treatment of pancreatic exocrine insufficiency, irritable bowel syndrome or biliary spasm, intrahepatic cholestasis or depressive symptoms, gynecological disorder, hormone replacement therapy, dyslipidemia, hypertension, hypothyroidism, MÃ©niÃ¨re's disease and vestibular vertigo, pain, fever, inflammation, and migraine, as well as provides anti-infective clarithromycin, influenza vaccine, and products to regulate physiological rhythm of the colon. The Diagnostic Products segment offers laboratory systems in the areas of immunoassay, clinical chemistry, hematology, and transfusion; molecular diagnostics systems that automate the extraction, purification, and preparation of DNA and RNA from patient samples, as well as detect and measure infectious agents; point of care systems; cartridges for testing blood; rapid diagnostics lateral flow testing products; molecular point-of-care testing for HIV, SARS-CoV-2, influenza A and B, RSV, and strep A; cardiometabolic test systems; drug and alcohol test, and remote patient monitoring and consumer self-test systems; and informatics and automation solutions for use in laboratories. The Nutritional Products segment provides pediatric and adult nutritional products. The Medical Devices segment offers rhythm management, electrophysiology, heart failure, vascular, and structural heart devices for the treatment of cardiovascular diseases; and diabetes care products, as well as neuromodulation devices for the management of chronic pain and movement disorders. Abbott Laboratories was founded in 1888 and is based in North Chicago, Illinois.",
      weight: '0.005259613',
      esgrating: {
        environment_score: 716,
        social_score: 457,
        governance_score: 642,
        total: 1125,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/abbottlaboratories0.png',
      daily_change: {
        currentprice: 104.02,
        absoluteChange: -0.99,
        percentageChange: -0.94,
      },
    },
    {
      _id: {
        $oid: '63457b65e940127420948cb3',
      },
      idnumber: '41',
      exchange: 'NMS',
      symbol: 'AAPL',
      shortname: 'Apple Inc.',
      longname: 'Apple Inc.',
      longnamesort: 'AppleInc',
      sector: 'Technology',
      industry: 'Consumer Electronics',
      marketcap: '2.53E+12',
      ebitda: '1.30E+11',
      revenuegrowth: '0.019',
      city: 'Cupertino',
      state: 'CA',
      country: 'United States',
      fulltimeemployees: '154000',
      longbusinesssummary:
        'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services. In addition, the company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; AirPods Max, an over-ear wireless headphone; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, HomePod, and iPod touch. Further, it provides AppleCare support services; cloud services store services; and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts. Additionally, the company offers various services, such as Apple Arcade, a game subscription service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It distributes third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was incorporated in 1977 and is headquartered in Cupertino, California.',
      weight: '0.073129',
      esgrating: {
        environment_score: 493,
        social_score: 421,
        governance_score: 536,
        total: 891,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/appleinc0.png',
      daily_change: {
        currentprice: 141.51,
        absoluteChange: 0.34,
        percentageChange: 0.24,
      },
    },
    {
      _id: {
        $oid: '63457b65e940127420948ca1',
      },
      idnumber: '23',
      exchange: 'NMS',
      symbol: 'AMZN',
      shortname: 'Amazon.com, Inc.',
      longname: 'Amazon.com, Inc.',
      longnamesort: 'AmazoncomInc',
      sector: 'Consumer Cyclical',
      industry: 'Internet Retail',
      marketcap: '1.27E+12',
      ebitda: '52620001280',
      revenuegrowth: '0.072',
      city: 'Seattle',
      state: 'WA',
      country: 'United States',
      fulltimeemployees: '1523000',
      longbusinesssummary:
        'Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally. The company operates through three segments: North America, International, and Amazon Web Services (AWS). It sells merchandise and content purchased for resale from third-party sellers through physical and online stores. The company also manufactures and sells electronic devices, including Kindle, Fire tablets, Fire TVs, Rings, and Echo and other devices; provides Kindle Direct Publishing, an online service that allows independent authors and publishers to make their books available in the Kindle Store; and develops and produces media content. In addition, it offers programs that enable sellers to sell their products on its websites, as well as its stores; and programs that allow authors, musicians, filmmakers, Twitch streamers, skill and app developers, and others to publish and sell content. Further, the company provides compute, storage, database, analytics, machine learning, and other services, as well as fulfillment, advertising, publishing, and digital content subscriptions. Additionally, it offers Amazon Prime, a membership program, which provides free shipping of various items; access to streaming of movies and series; and other services. The company serves consumers, sellers, developers, enterprises, and content creators. Amazon.com, Inc. was incorporated in 1994 and is headquartered in Seattle, Washington.',
      weight: '0.036644019',
      esgrating: {
        environment_score: 931,
        social_score: 452,
        governance_score: 947,
        total: 1422,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/amazoncominc0.png',
      daily_change: {
        currentprice: 92.12,
        absoluteChange: -0.31,
        percentageChange: -0.33,
      },
    },
    {
      _id: {
        $oid: '63457b6ae940127420948e24',
      },
      idnumber: '410',
      exchange: 'NMS',
      symbol: 'TSLA',
      shortname: 'Tesla, Inc.',
      longname: 'Tesla, Inc.',
      longnamesort: 'TeslaInc',
      sector: 'Consumer Cyclical',
      industry: 'Auto Manufacturers',
      marketcap: '3.10E+11',
      ebitda: '14030000128',
      revenuegrowth: '0.416',
      city: 'Austin',
      state: 'TX',
      country: 'United States',
      fulltimeemployees: '99290',
      longbusinesssummary:
        'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally. The company operates in two segments, Automotive, and Energy Generation and Storage. The Automotive segment offers electric vehicles, as well as sells automotive regulatory credits. It provides sedans and sport utility vehicles through direct and used vehicle sales, a network of Tesla Superchargers, and in-app upgrades; and purchase financing and leasing services. This segment is also involved in the provision of non-warranty after-sales vehicle services, sale of used vehicles, retail merchandise, and vehicle insurance, as well as sale of products to third party customers; services for electric vehicles through its company-owned service locations, and Tesla mobile service technicians; and vehicle limited warranties and extended service plans. The Energy Generation and Storage segment engages in the design, manufacture, installation, sale, and leasing of solar energy generation and energy storage products, and related services to residential, commercial, and industrial customers and utilities through its website, stores, and galleries, as well as through a network of channel partners. This segment also offers service and repairs to its energy product customers, including under warranty; and various financing options to its solar customers. The company was formerly known as Tesla Motors, Inc. and changed its name to Tesla, Inc. in February 2017. Tesla, Inc. was incorporated in 2003 and is headquartered in Austin, Texas.',
      weight: '0.008955856',
      esgrating: {
        environment_score: 771,
        social_score: 239,
        governance_score: 585,
        total: 993,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/teslainc0.png',
      daily_change: {
        currentprice: 182.32,
        absoluteChange: 1.49,
        percentageChange: 0.82,
      },
    },
    {
      _id: {
        $oid: '63457b68e940127420948db0',
      },
      idnumber: '294',
      exchange: 'NMS',
      symbol: 'MSFT',
      shortname: 'Microsoft Corporation',
      longname: 'Microsoft Corporation',
      longnamesort: 'MicrosoftCorporation',
      sector: 'Technology',
      industry: 'Softwareâ€”Infrastructure',
      marketcap: '1.84E+12',
      ebitda: '97982996480',
      revenuegrowth: '0.124',
      city: 'Redmond',
      state: 'WA',
      country: 'United States',
      fulltimeemployees: '221000',
      longbusinesssummary:
        'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates in three segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing. The Productivity and Business Processes segment offers Office, Exchange, SharePoint, Microsoft Teams, Office 365 Security and Compliance, Microsoft Viva, and Skype for Business; Skype, Outlook.com, OneDrive, and LinkedIn; and Dynamics 365, a set of cloud-based and on-premises business solutions for organizations and enterprise divisions. The Intelligent Cloud segment licenses SQL, Windows Servers, Visual Studio, System Center, and related Client Access Licenses; GitHub that provides a collaboration platform and code hosting service for developers; Nuance provides healthcare and enterprise AI solutions; and Azure, a cloud platform. It also offers enterprise support, Microsoft consulting, and nuance professional services to assist customers in developing, deploying, and managing Microsoft server and desktop solutions; and training and certification on Microsoft products. The More Personal Computing segment provides Windows original equipment manufacturer (OEM) licensing and other non-volume licensing of the Windows operating system; Windows Commercial, such as volume licensing of the Windows operating system, Windows cloud services, and other Windows commercial offerings; patent licensing; and Windows Internet of Things. It also offers Surface, PC accessories, PCs, tablets, gaming and entertainment consoles, and other devices; Gaming, including Xbox hardware, and Xbox content and services; video games and third-party video game royalties; and Search, including Bing and Microsoft advertising. The company sells its products through OEMs, distributors, and resellers; and directly through digital marketplaces, online stores, and retail stores. Microsoft Corporation was founded in 1975 and is headquartered in Redmond, Washington.',
      weight: '0.052971413',
      esgrating: {
        environment_score: 994,
        social_score: 664,
        governance_score: 789,
        total: 1533,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/microsoftcorporation0.jpeg',
      daily_change: {
        currentprice: 241.79,
        absoluteChange: 1.46,
        percentageChange: 0.61,
      },
    },
    {
      _id: {
        $oid: '63457b65e940127420948c93',
      },
      idnumber: '9',
      exchange: 'NMS',
      symbol: 'AMD',
      shortname: 'Advanced Micro Devices, Inc.',
      longname: 'Advanced Micro Devices, Inc.',
      longnamesort: 'AdvancedMicroDevicesInc',
      sector: 'Technology',
      industry: 'Semiconductors',
      marketcap: '92708216832',
      ebitda: '4857999872',
      revenuegrowth: '0.709',
      city: 'Santa Clara',
      state: 'CA',
      country: 'United States',
      fulltimeemployees: '15500',
      longbusinesssummary:
        'Advanced Micro Devices, Inc. operates as a semiconductor company worldwide. The company operates in two segments, Computing and Graphics; and Enterprise, Embedded and Semi-Custom. Its products include x86 microprocessors as an accelerated processing unit, chipsets, discrete and integrated graphics processing units (GPUs), data center and professional GPUs, and development services; and server and embedded processors, and semi-custom System-on-Chip (SoC) products, development services, and technology for game consoles. The company provides processors for desktop and notebook personal computers under the AMD Ryzen, AMD Ryzen PRO, Ryzen Threadripper, Ryzen Threadripper PRO, AMD Athlon, AMD Athlon PRO, AMD FX, AMD A-Series, and AMD PRO A-Series processors brands; discrete GPUs for desktop and notebook PCs under the AMD Radeon graphics, AMD Embedded Radeon graphics brands; and professional graphics products under the AMD Radeon Pro and AMD FirePro graphics brands. It also offers Radeon Instinct, Radeon PRO V-series, and AMD Instinct accelerators for servers; chipsets under the AMD trademark; microprocessors for servers under the AMD EPYC; embedded processor solutions under the AMD Athlon, AMD Geode, AMD Ryzen, AMD EPYC, AMD R-Series, and G-Series processors brands; and customer-specific solutions based on AMD CPU, GPU, and multi-media technologies, as well as semi-custom SoC products. It serves original equipment manufacturers, public cloud service providers, original design manufacturers, system integrators, independent distributors, online retailers, and add-in-board manufacturers through its direct sales force, independent distributors, and sales representatives. The company was incorporated in 1969 and is headquartered in Santa Clara, California.',
      weight: '0.002674991',
      esgrating: {
        environment_score: 278,
        social_score: 311,
        governance_score: 421,
        total: 608,
      },
      logo: 'https://stockapplogobucket.s3.eu-west-1.amazonaws.com/advancedmicrodevicesinc0.png',
      daily_change: {
        currentprice: 78.2,
        absoluteChange: 4.81,
        percentageChange: 6.55,
      },
    },
  ];

  return (
    <>
      <Container className='splash-page-container'>
        <Row className='py-4'>
          <Col className='mx-4'>
            <h1>Fantasy Stock Trading Game</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Image thumbnail src={'FinOptimizeLogo.png'} className='splashLogo' style={{ border: "none" }}></Image>
          </Col>
          <Row>
            <Col className='mx-4'>
              <p className='splashpageParagraph'>
                FinOptimise is a fantasy stock trading game. Play with friends.
                Use our artificial intelligence to pick the best stocks. Good
                luck!
              </p>
            </Col>
          </Row>
          <Row className='py-4'>
            <Col>
              <Button onClick={navigateLogin} className='btn-lg' style={{ border: "5px solid #d4d4d4", fontWeight: "bold", borderRadius: "2em", padding: "1rem 2rem 1rem 2rem" }}>
                Play Now
              </Button>
            </Col>
          </Row>

        </Row>
      </Container>
      <Row className='py-4 banner'>
        <p className='quote'>"Slick" - The independent</p>
        <p className='quote'>"Future 5 star app" - The Guardian</p>
      </Row>
      <Container className='splash-page-container'>
        <Row className='py-4'>
          <Col>
            <h2>About the App</h2>
          </Col>
        </Row>
        <Row>
          <Col className='mx-4'>
            <p className='splashpageParagraph'>
              Experience the stock market risk free. Learn about healthy investing habits. Research stocks to get ahead. Compete with friends in game leagues with customisable rules.
            </p>
          </Col>
        </Row>
        <Row className='py-4'>
          <Col sm md={8} className='offset-md-2'>
            <SplashCarousel></SplashCarousel>
          </Col>
        </Row>
        <Row className='py-4'>
          <Col>
            <h2>About the Game</h2>
          </Col>
        </Row>
        <Row>
          <Col className='mx-4'>
            <p>
              Create a league, invite your friends, test your skills, Research
              stocks to get ahead. Use our advanced artificial intelligence
              models to analyse the news and twitter to see if sentiment is
              positive negative or neutral. Get personalised stock
              recommendations based on your previous trades
            </p>
          </Col>
        </Row>
      </Container>

      <Container className='stockDisplayContainer'>
        <Row>
          <Col>
            <div className='stockDisplay'>
              <h3 style={{ textAlign: 'center', color: "white", paddingBottom: "1rem" }}>Explore hundreds of stocks from the world's premier stock market index.</h3>
              <h3 style={{ textAlign: 'center' }}></h3>
              <div className='stockDisplayCol'>
                <SideScrollMenu>
                  {stocks.map((stockObj) => (
                    <div
                      className='sideScrollCard not-clickable stockDisplayCol splashScroller'
                      key={stockObj._id}
                    >
                      <TickerCard key={stockObj._id} stock={stockObj} />
                    </div>
                  ))}
                </SideScrollMenu>
              </div>
            </div>
          </Col>
        </Row>
        <Row className='py-4'>
          <Col>
            <Button onClick={navigateLogin} className='btn-lg' style={{ border: "5px solid #d4d4d4", fontWeight: "bold", borderRadius: "2em", padding: "1rem 2rem 1rem 2rem" }}>
              Explore Now
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className='splash-page-container'>
        <Row className='py-4'>
          <Col>
            <h2>Advanced A.I. Tools</h2>
          </Col>
          <Row>
            <Col className='mx-4'>
              <p className='splashpageParagraph'>
                Use our A.I. tools to get the latest news and tweets relating to each stock, with sentiment classification of the contents into Positive, Neautral or Negative categories.
              </p>
            </Col>
          </Row>

          <Col sm md={8} className='offset-md-2'>
            <Card id='newsCardContainer' className='newsCardContainer'>
              <h2 className='newsCardContainerHeading'>News Feed</h2>
              <Card.Body className='newsCardContainerBody'>
                <>
                  <Row xs={1} md={1}>
                    {articles.map((article) => (
                      <Col
                        key={`${article.link}`}
                        className='pb-3 not-clickable'
                      >
                        <NewsArticleCard article={article} />
                      </Col>
                    ))}
                  </Row>
                </>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm md={8} className='stockInfoCol offset-md-2'>
            <ChartCard title={'Twitter Sentiment'} data={stockSentimentData} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className='py-4'>
          <Col>
            <h2 style={{ textAlign: 'center' }}>
              Environmenatal Social and Governance (ESG) Investing
            </h2>
          </Col>
        </Row>
        {/* <TickerCard key={} stock={} /> */}
        <Row>
          <Col>
            <p style={{ textAlign: 'center' }}>
              See at a glance the ESG rating of each stock
            </p>
          </Col>
        </Row>
        <Row className='esg-row' style={{ alignItems: 'center' }}>
          <Col sm md={8} className='stockInfoCol offset-md-2'>
            <ChartCardESG title={'ESG Rating'} edata={3} sdata={2} gdata={1} />
          </Col>
        </Row>
      </Container>
      <Footer />

    </>
  );
}

export default HomeScreen;
