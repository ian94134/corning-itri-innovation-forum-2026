const speakers=[
['主論壇','Dr. Claudio Mazzali','Corning｜Vice President, Global Research','The Science-to-Factory Continuum : Innovation, Collaboration, and Performance at Scale','Corning.Dr.-Claudio-Mazzali.jpg'],
['主論壇','吳志毅 博士','工研院｜資深專家','Megatrends & Strategic Vision : Shaping the Next Decade','ITRI.吳志毅_Dr.-Chih-I-Wu.jpg'],
['專題論壇 I','Dr. Robert Lee','Corning｜Program Director, Co-Packaged Optics','Glass-Based Platform Future in Co-Packaged Optics','Corning.Dr.-Robert-Lee.jpg'],
['專題論壇 I','洪瑞華 博士','工研院｜電光系統所 技術長','High-Speed SiPh System by Heterogeneous Technology','ITRI.洪瑞華_Dr.-Ray-Hua-Horng.jpg'],
['專題論壇 I','Dr. Jay Zhang','Corning｜Business Development Director, P&W','Innovative Materials Solutions for Advanced Packaging','Corning.Dr-Jay-Zhang.jpg'],
['專題論壇 I','駱韋仲 博士','工研院｜電光系統所 副所長','Wafer-Level System Integration for 3D-Stacked Chiplets & Materials Challenges','ITRI.駱韋仲_Dr.-Robert-Lo.jpg'],
['專題論壇 I','Dr. Siavash Yazdanfar','Corning｜Director, Device & System','Integration of advanced materials into devices and systems','Corning.Dr.-Siavash-Yazdanfar.jpg'],
['專題論壇 I','王慶鈞 博士','工研院｜機械所 半導體設備技術組 副組長','Development of a Digital Twin for Thin Film Deposition Process and Advanced Device Integration','ITRI.王慶鈞_Dr.jpg'],
['專題論壇 II','Dr. Marie-Maud Béar','Corning｜CLS Portfolio Leader','Advancing Cell and Gene Therapy and 3D cell culture: Opportunities, Translation Challenges, and Enabling Technologies','Corning.Dr.-Marie-Maud-Béar.jpg'],
['專題論壇 II','周民元 博士','工研院｜生醫所 副所長','Introduction to Biotherapeutics R&D at ITRI','ITRI.周民元_Dr.jpg'],
['專題論壇 II','鄭淑珍 博士','工研院｜生醫所 創新醫藥組 組長','Tailoring Ionizable Lipids for Next-Gen LNP Therapeutics','ITRI.鄭淑珍_Dr.-Felice-Cheng.jpg'],
['專題論壇 II','陳瑜帆 博士','工研院｜生醫所 生醫診斷組 副組長','Engineering Reproducible Microphysiological Systems for NAMs','ITRI.陳瑜帆_Dr.-Roger-Chen.jpg'],
['專題論壇 II','Sam Zoubi','Corning｜Director, Fluid Dynamics & Process Modeling','Digital Twin Journey','Corning.Dr.-Sam-Zoubi.jpg'],
['專題論壇 II','陳俊 博士','工研院｜機械所 企劃與營運發展組 業務總監','Overview of MMSL and Manufacturing Driven by AI','ITRI.陳俊_Jiun-Chen.jpg']];
const agendas=[
{title:'主論壇 / Plenary Session',location:'09:00–12:30｜地點：51館116室（1F）・技術展示交流與午餐：2F 大廳',rows:[
['09:00–09:30','開場致詞'],['09:30–09:40','大合照'],['09:40–10:10','Megatrends – 康寧：科技與創新趨勢',0],['10:10–10:40','Megatrends – 工研院：產業與技術趨勢',1],['10:40–11:10','座談討論：從趨勢到未來合作'],['11:10–11:20','中場休息'],['11:20–12:30','技術展示交流暨輕食餐敘',null,'本時段以海報與展品展示交流為主，現場提供簡易輕食；因場地空間有限，僅限事先報名本時段者入場。']]},
{title:'專題論壇 I：未來運算 / 光子技術 / 半導體整合',en:'FORUM I · FUTURE COMPUTE / PHOTONICS / SEMICONDUCTOR',location:'地點｜51館116室（1F）',rows:[['12:30–13:10','CPO – Corning',2],['13:10–13:50','CPO – ITRI',3],['13:50–14:00','中場休息'],['14:00–14:40','Advanced Packaging – Corning',4],['14:40–15:20','Advanced Packaging – ITRI',5],['15:20–15:30','中場休息'],['15:30–16:10','Device integration – Corning',6],['16:10–16:50','Device integration – ITRI',7],['16:50–17:20','專題論壇 I QA Panel'],['17:20–17:30','閉幕與大合照']]},
{title:'專題論壇 II：生命科學 / AI 賦能製造',en:'FORUM II · LIFE SCIENCES / AI MANUFACTURING',location:'地點｜51館3A室（3F）',rows:[['12:30–13:10','Life Sciences – Corning',8],['13:10–13:55','Life Sciences – ITRI',[9,10,11]],['13:55–14:25','Life Sciences QA Panel'],['14:25–14:40','中場休息'],['14:40–15:20','AI 與智慧製造 – Corning',12],['15:20–16:00','AI 與智慧製造 – ITRI',13],['16:00–16:30','AI QA Panel'],['16:30–16:40','閉幕與大合照']]}];
