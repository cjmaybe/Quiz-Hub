import { useState, useCallback } from "react";

// ── Inject Nothing-style fonts ────────────────────────────────────────────────
const FontInjector = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #FAFAFA;
      --surface: #FFFFFF;
      --text: #0A0A0A;
      --text-secondary: #888888;
      --border: #E5E5E5;
      --red: #FF3B30;
      --red-soft: #FFF0EE;
      --green: #34C759;
      --green-soft: #EEFBF1;
      --amber: #FF9500;
      --amber-soft: #FFF8EE;
      --mono: 'Space Mono', 'SF Mono', 'Consolas', monospace;
      --sans: 'Space Grotesk', -apple-system, 'Segoe UI', sans-serif;
    }

    body {
      font-family: var(--sans);
      background: var(--bg);
      color: var(--text);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    ::selection {
      background: var(--red);
      color: white;
    }

    button { font-family: var(--sans); }
  `}</style>
);

// ── Dot Grid Pattern (Nothing signature) ─────────────────────────────────────
const DotGrid = ({ opacity = 0.3 }) => (
  <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none",opacity}}>
    <defs>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="0.8" fill="#0A0A0A"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)"/>
  </svg>
);

// ── SVG Diagrams ──────────────────────────────────────────────────────────────

// Diagrams are kept but with eslint-disable comments to fix the build
/* eslint-disable no-unused-vars */
// ── Data tables / charts for the new question bank (23TPS05 Set 01) ───────────
const tblWrap = {margin:"16px 0",border:"1px solid var(--border)",borderRadius:2,background:"var(--surface)",overflowX:"auto"};
const tblBase = {width:"100%",borderCollapse:"collapse",fontFamily:"var(--mono)",fontSize:12};
const th = {padding:"8px 10px",borderBottom:"1px solid var(--border)",textAlign:"center",fontWeight:700,color:"var(--text)",background:"#F5F5F5",whiteSpace:"nowrap"};
const td = {padding:"8px 10px",borderBottom:"1px solid var(--border)",textAlign:"center",color:"#444",whiteSpace:"nowrap"};

const CompanyTable = () => (
  <div style={tblWrap}>
    <div style={{padding:"10px 12px",fontSize:12,color:"#888",lineHeight:1.5,borderBottom:"1px solid var(--border)"}}>
      Revenue, expenses and profit/loss (in $ Millions) of five companies for 2025.
    </div>
    <table style={tblBase}>
      <thead><tr>{["Company","Revenue ($M)","Expenses ($M)","Profit / Loss ($M)","Employees"].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
      <tbody>
        {[["A",120,85,"35",450],["B",200,160,"40",800],["C",95,110,"-15 (Loss)",300],["D",150,105,"45",500],["E",310,220,"90","1,200"]].map(r => (
          <tr key={r[0]}>
            <td style={{...td,fontWeight:700,color:"var(--text)"}}>Company {r[0]}</td>
            <td style={td}>{r[1]}</td><td style={td}>{r[2]}</td>
            <td style={{...td,color:String(r[3]).startsWith("-")?"var(--red)":"#444"}}>{r[3]}</td>
            <td style={td}>{r[4]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const VotesPieDiagram = () => {
  const cx = 130, cy = 120, r = 90;
  const slices = [
    {name:"Yasin",deg:80,color:"#4F81BD"},
    {name:"Sivaraman",deg:100,color:"#C0504D"},
    {name:"Vishwanath",deg:120,color:"#9BBB59"},
    {name:"Paramjeet",deg:60,color:"#8064A2"},
  ];
  let start = 0;
  const pt = (deg, rad) => {
    const a = (deg - 90) * Math.PI / 180;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  };
  return (
    <div style={{margin:"16px 0",border:"1px solid var(--border)",borderRadius:2,background:"var(--surface)",padding:"12px 8px"}}>
      <div style={{fontSize:12,color:"#888",lineHeight:1.5,padding:"0 8px 8px"}}>
        Votes obtained by four students in a school leadership election. Total valid votes polled: 720.
      </div>
      <svg viewBox="0 0 260 240" width="100%" style={{display:"block",maxWidth:300,margin:"0 auto"}}>
        {slices.map(s => {
          const end = start + s.deg;
          const [x1,y1] = pt(start,r), [x2,y2] = pt(end,r);
          const [lx,ly] = pt(start + s.deg/2, r*0.62);
          const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${s.deg>180?1:0} 1 ${x2},${y2} Z`;
          start = end;
          return (
            <g key={s.name}>
              <path d={d} fill={s.color} stroke="white" strokeWidth="1"/>
              <text x={lx} y={ly-2} textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="var(--mono)">{s.name}</text>
              <text x={lx} y={ly+10} textAnchor="middle" fontSize="9" fill="white" fontFamily="var(--mono)">{s.deg}°</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const SubscriptionTable = () => (
  <div style={tblWrap}>
    <div style={{padding:"10px 12px",fontSize:12,color:"#888",lineHeight:1.5,borderBottom:"1px solid var(--border)"}}>
      Subscription of different schemes of a Mutual Fund Company over the months (₹ in crores).
    </div>
    <table style={tblBase}>
      <thead><tr>{["Month","V","W","X","Y","Z","Total"].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
      <tbody>
        {[["September",200,70,30,290,10,600],["October",120,130,70,150,290,760],["November",45,35,25,125,160,390],["December",160,110,40,115,130,555],["January",80,90,70,100,140,480],["February",130,150,30,40,390,740]].map(r => (
          <tr key={r[0]}>
            <td style={{...td,fontWeight:700,color:"var(--text)",textAlign:"left"}}>{r[0]}</td>
            {r.slice(1).map((v,i) => <td key={i} style={{...td,fontWeight:i===5?700:400,color:i===5?"var(--text)":"#444"}}>{v}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* eslint-enable no-unused-vars */

// ── Question Data ─────────────────────────────────────────────────────────────

const ALL_QUESTIONS = [
  // ═══ 23TPS05 – QUANTITATIVE APTITUDE & LOGICAL REASONING III (SET 01) ═══

  // UNIT I – Data Interpretation & Clocks
  {id:1, unit:1, unitName:"DATA & CLOCKS", q:"What is the ratio of the total revenue of Company B and Company E combined to their total expenses combined?", opts:["51 : 38","3 : 2","17 : 13","5 : 4"], ans:0, diagram:<CompanyTable/>},
  {id:2, unit:1, unitName:"DATA & CLOCKS", q:"Which company recorded the highest profit margin percentage (Profit / Revenue × 100)?", opts:["Company D","Company A","Company B","Company E"], ans:0, diagram:<CompanyTable/>},
  {id:3, unit:1, unitName:"DATA & CLOCKS", q:"What was the difference between the number of votes obtained by Yasin and Vishwanath?", opts:["80","30","40","20"], ans:0, diagram:<VotesPieDiagram/>},
  {id:4, unit:1, unitName:"DATA & CLOCKS", q:"What is the difference in the subscription of scheme V between December and February?", opts:["₹30 crores","₹80 lacs","₹240 crores","₹240 lacs"], ans:0, diagram:<SubscriptionTable/>},
  {id:5, unit:1, unitName:"DATA & CLOCKS", q:"Find the total difference between September and November.", opts:["210 cr","160 cr","45 cr","140 cr"], ans:0, diagram:<SubscriptionTable/>},
  {id:6, unit:1, unitName:"DATA & CLOCKS", q:"What is the angle between the hour hand and the minute hand at 3:30?", opts:["75°","65°","95°","105°"], ans:0},
  {id:7, unit:1, unitName:"DATA & CLOCKS", q:"At what time between 4 o'clock and 5 o'clock will the hands of a clock coincide?", opts:["21 9/11 minutes past 4","21 10/11 minutes past 4","21 2/11 minutes past 4","23 9/11 minutes past 4"], ans:0},
  {id:8, unit:1, unitName:"DATA & CLOCKS", q:"How many times in a day (24 hours) do the hands of a clock form a straight line (0° or 180°)?", opts:["44","48","24","22"], ans:0},
  {id:9, unit:1, unitName:"DATA & CLOCKS", q:"Find the reflex angle between the hands of a clock at 10:25.", opts:["197.5°","165.5°","105°","175°"], ans:0},
  {id:10, unit:1, unitName:"DATA & CLOCKS", q:"When the hands of a clock are at 180°, they are ________ spaces apart.", opts:["30 minutes","15 minutes","35 minutes","60 minutes"], ans:0},

  // UNIT II – Calendar & Series
  {id:11, unit:2, unitName:"CALENDAR & SERIES", q:"If 15th August 2011 was a Monday, what day of the week was 15th August 2012?", opts:["Wednesday","Monday","Tuesday","Thursday"], ans:0},
  {id:12, unit:2, unitName:"CALENDAR & SERIES", q:"The odd days of 646 days is ________.", opts:["2 days","3 days","5 days","4 days"], ans:0},
  {id:13, unit:2, unitName:"CALENDAR & SERIES", q:"Which of these days cannot be the last day of a century?", opts:["Saturday","Monday","Sunday","Friday"], ans:0},
  {id:14, unit:2, unitName:"CALENDAR & SERIES", q:"Today is Tuesday. What day of the week will it be after 62 days?", opts:["Monday","Sunday","Tuesday","Wednesday"], ans:0},
  {id:15, unit:2, unitName:"CALENDAR & SERIES", q:"Which of the following century years is NOT a leap year?", opts:["2100","1600","2000","2400"], ans:0},
  {id:16, unit:2, unitName:"CALENDAR & SERIES", q:"Find the missing number in the series: 4, 11, 25, 53, 109, ?", opts:["221","217","219","225"], ans:0},
  {id:17, unit:2, unitName:"CALENDAR & SERIES", q:"What comes next in the sequence: 2, 3, 10, 39, 172, ?", opts:["885","785","865","845"], ans:0},
  {id:18, unit:2, unitName:"CALENDAR & SERIES", q:"Find the missing term: 3, 7, 16, 32, 57, ?", opts:["93","85","92","98"], ans:0},
  {id:19, unit:2, unitName:"CALENDAR & SERIES", q:"Find the odd number from the given options: 35, 49, 63, 81, 91", opts:["81","35","49","63"], ans:0},
  {id:20, unit:2, unitName:"CALENDAR & SERIES", q:"Find the missing term of the series: 10, 12, 22, 34, 56, 90, ?", opts:["146","188","160","100"], ans:0},

  // UNIT III – Simple & Compound Interest
  {id:21, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"What is the time period for which ₹6,000 amounts to ₹12,000 at 20% p.a. simple interest?", opts:["5 years","2 years","3 years","4 years"], ans:0},
  {id:22, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"Find the simple interest on ₹2,500 at 8% per annum for 2 years.", opts:["₹400","₹490","₹500","₹450"], ans:0},
  {id:23, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"₹7,000 is invested at 6% per annum for 2 years. Find the total amount.", opts:["₹7,840","₹7,800","₹8,840","₹7,700"], ans:0},
  {id:24, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"Find the simple interest on ₹1,500 at 10% per annum for 4 years.", opts:["₹600","₹650","₹660","₹610"], ans:0},
  {id:25, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"A sum of ₹8,000 earns ₹1,200 as simple interest in 3 years. Find the rate of interest.", opts:["5%","6%","7%","10%"], ans:0},
  {id:26, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"What is the formula to find Compound Interest (compounded annually)?", opts:["CI = P(1 + R/100)ⁿ − P","CI = P(1 + R/1000)ⁿ − P","CI = P(1 + 2R/100)ⁿ − P","CI = P(1 + R/10)ⁿ − P"], ans:0},
  {id:27, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"Find the amount on ₹2,000 at 5% per annum for 2 years, compounded annually.", opts:["₹2,205","₹2,105","₹2,005","₹2,200"], ans:0},
  {id:28, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"Find the compound interest on ₹5,000 at 10% per annum for 2 years.", opts:["₹1,050","₹1,000","₹1,010","₹1,150"], ans:0},
  {id:29, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"Find the amount on ₹1,500 at 10% per annum for 2 years (compounded annually).", opts:["₹1,815","₹1,810","₹1,805","₹1,915"], ans:0},
  {id:30, unit:3, unitName:"SIMPLE & COMPOUND INTEREST", q:"Find the compound interest on ₹2,500 at 8% per annum for 2 years.", opts:["₹416","₹412","₹411","₹410"], ans:0},

  // UNIT IV – Course of Action & Syllogism
  {id:31, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statement: A school has reported that several students are not attending classes regularly.\nCourse of Action:\nI. Teachers should identify the reasons for poor attendance.\nII. The school should encourage parents to monitor attendance.", opts:["Both I and II follow","Only I follows","Only II follows","Neither I nor II follows"], ans:0},
  {id:32, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statement: A hospital is crowded because many patients arrive at the same time.\nCourse of Action:\nI. The hospital should improve its appointment system.\nII. The hospital should refuse treatment to all new patients.", opts:["Only I follows","Only II follows","Neither I nor II follows","Both I and II follow"], ans:0},
  {id:33, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statement: Many road accidents are occurring at a particular junction.\nCourse of Action:\nI. Traffic signals or warning signs should be considered at the junction.\nII. Traffic authorities should study the causes of the accidents.", opts:["Both I and II follow","Only I follows","Only II follows","Neither I nor II follows"], ans:0},
  {id:34, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statement: Students are finding it difficult to understand a particular subject.\nCourse of Action:\nI. The teacher should provide additional explanation and practice.\nII. The subject should be removed from the curriculum immediately.", opts:["Only I follows","Only II follows","Neither I nor II follows","Both I and II follow"], ans:0},
  {id:35, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statement: A company wants to improve the skills of its employees.\nCourse of Action:\nI. The company should conduct regular training programmes.\nII. Employees should be given opportunities to learn new skills.", opts:["Both I and II follow","Only I follows","Only II follows","Neither I nor II follows"], ans:0},
  {id:36, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statements: Some books are novels. All novels are interesting.\nI. Some books are interesting.\nII. All books are interesting.", opts:["Only I follows","Only II follows","Neither I nor II follows","Both I and II follow"], ans:0},
  {id:37, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statements: All apples are fruits. Some fruits are sweet.\nI. Some apples are sweet.\nII. All apples are fruits.", opts:["Only II follows","Only I follows","Neither I nor II follows","Both I and II follow"], ans:0},
  {id:38, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statements: No teachers are students. Some students are athletes.\nI. Some athletes are not teachers.\nII. No athletes are teachers.", opts:["Only I follows","Only II follows","Neither I nor II follows","Both I and II follow"], ans:0},
  {id:39, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statements: All laptops are electronic devices. Some electronic devices are expensive.\nI. Some laptops are expensive.\nII. All laptops are electronic devices.", opts:["Only II follows","Only I follows","Neither I nor II follows","Both I and II follow"], ans:0},
  {id:40, unit:4, unitName:"COURSE OF ACTION & SYLLOGISM", q:"Statements: All singers are artists. All artists are creative.\nI. All singers are creative.\nII. Some creative people are singers.", opts:["Both I and II follow","Only I follows","Only II follows","Neither I nor II follows"], ans:0},

  // UNIT V – Seating Arrangement & Data Sufficiency
  {id:41, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Six friends (P, Q, R, S, T, U) are sitting in a row facing North. P and U are at the extreme ends. R is sitting to the immediate right of P. S is to the immediate left of U. Q is to the immediate left of S. Who is sitting to the immediate right of R?", opts:["T","Q","P","S"], ans:0},
  {id:42, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Five students are sitting in a row facing South. (When facing South, 'Right' is towards the observer's Left.) A is at the extreme left end. B is to the immediate right of A. C is in the middle. D is to the right of C, and E is at the extreme right end. Who is sitting to the immediate left of C?", opts:["B","A","E","D"], ans:0},
  {id:43, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Four people (M, N, O, P) are sitting in a line facing North. M is to the immediate left of N. O is to the immediate right of N. P is to the immediate right of O. Who is sitting at the extreme left end?", opts:["M","N","O","P"], ans:0},
  {id:44, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Eight people P, Q, R, S, T, U, V and W sit around a circle. P is opposite T. Q is opposite U. R is opposite V. Who is opposite S?", opts:["W","Q","P","T"], ans:0},
  {id:45, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Six students A, B, C, D, E and F sit around a circular table. A is immediately right of B. C is immediately right of A. Who is immediately left of A?", opts:["B","A","E","D"], ans:0},
  {id:46, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Data Sufficiency: What is the perimeter of a square?\nI. Each side is 6 cm.\nII. All four sides are equal.", opts:["Statement I alone is sufficient","Statement II alone is sufficient","Both statements together are sufficient","Either statement alone is sufficient"], ans:0},
  {id:47, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Data Sufficiency: How many books does Arun have?\nI. Arun has 5 more books than Bala.\nII. Bala has 10 books.", opts:["Both statements together are sufficient","Statement I alone is sufficient","Statement II alone is sufficient","Either statement alone is sufficient"], ans:0},
  {id:48, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Data Sufficiency: What is the value of z?\nI. z − 3 = 9.\nII. z is greater than 5.", opts:["Statement I alone is sufficient","Statement II alone is sufficient","Both statements together are sufficient","Either statement alone is sufficient"], ans:0},
  {id:49, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Data Sufficiency: How many students are in a class?\nI. There are 20 boys.\nII. There are 15 girls.", opts:["Both statements together are sufficient","Statement I alone is sufficient","Statement II alone is sufficient","Either statement alone is sufficient"], ans:0},
  {id:50, unit:5, unitName:"SEATING & DATA SUFFICIENCY", q:"Data Sufficiency: What is the value of x/y?\nI. x = 12.\nII. y = 3.", opts:["Both statements together are sufficient","Statement I alone is sufficient","Statement II alone is sufficient","Either statement alone is sufficient"], ans:0}
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LETTERS = ["A","B","C","D"];

// ── Main App ──────────────────────────────────────────────────────────────────
export default function QuizApp() {
  const UNITS = [
    {id:0, label:"ALL UNITS", short:"ALL", count: ALL_QUESTIONS.length},
    {id:1, label:"DATA & CLOCKS", short:"01", count: ALL_QUESTIONS.filter(q=>q.unit===1).length},
    {id:2, label:"CALENDAR & SERIES", short:"02", count: ALL_QUESTIONS.filter(q=>q.unit===2).length},
    {id:3, label:"SIMPLE & COMPOUND INTEREST", short:"03", count: ALL_QUESTIONS.filter(q=>q.unit===3).length},
    {id:4, label:"COURSE OF ACTION & SYLLOGISM", short:"04", count: ALL_QUESTIONS.filter(q=>q.unit===4).length},
    {id:5, label:"SEATING & DATA SUFFICIENCY", short:"05", count: ALL_QUESTIONS.filter(q=>q.unit===5).length},
  ];

  const [screen, setScreen] = useState("home");
  const [selectedUnit, setSelectedUnit] = useState(0);
  const [shuffleQ, setShuffleQ] = useState(false);
  const [shuffleOpts, setShuffleOpts] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [optMapping, setOptMapping] = useState({});
