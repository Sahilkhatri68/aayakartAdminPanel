import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    name: 13,
    uv: 4403,
    pv: 300,
    amt: 973,
  },
  {
    name: 98,
    uv: 1409,
    pv: 240,
    amt: 166,
  },
  {
    name: 93,
    uv: 101,
    pv: 75,
    amt: 714,
  },
  {
    name: 79,
    uv: 4028,
    pv: 373,
    amt: 983,
  },
  {
    name: 24,
    uv: 1119,
    pv: 260,
    amt: 326,
  },
  {
    name: 70,
    uv: 4896,
    pv: 336,
    amt: 704,
  },
  {
    name: 96,
    uv: 2430,
    pv: 129,
    amt: 446,
  },
  {
    name: 84,
    uv: 3832,
    pv: 293,
    amt: 763,
  },
  {
    name: 4,
    uv: 3124,
    pv: 139,
    amt: 714,
  },
  {
    name: 75,
    uv: 2661,
    pv: 161,
    amt: 766,
  },
  {
    name: 23,
    uv: 1815,
    pv: 225,
    amt: 973,
  },
  {
    name: 67,
    uv: 4672,
    pv: 162,
    amt: 665,
  },
  {
    name: 89,
    uv: 179,
    pv: 500,
    amt: 812,
  },
  {
    name: 66,
    uv: 2951,
    pv: 183,
    amt: 806,
  },
  {
    name: 13,
    uv: 1478,
    pv: 88,
    amt: 830,
  },
  {
    name: 76,
    uv: 4210,
    pv: 437,
    amt: 784,
  },
  {
    name: 60,
    uv: 525,
    pv: 272,
    amt: 480,
  },
  {
    name: 12,
    uv: 4408,
    pv: 433,
    amt: 648,
  },
  {
    name: 7,
    uv: 546,
    pv: 7,
    amt: 980,
  },
  {
    name: 95,
    uv: 4805,
    pv: 94,
    amt: 550,
  },
  {
    name: 54,
    uv: 558,
    pv: 84,
    amt: 4,
  },
  {
    name: 58,
    uv: 985,
    pv: 307,
    amt: 170,
  },
  {
    name: 34,
    uv: 3190,
    pv: 438,
    amt: 479,
  },
  {
    name: 76,
    uv: 4510,
    pv: 129,
    amt: 82,
  },
  {
    name: 5,
    uv: 2748,
    pv: 340,
    amt: 856,
  },
  {
    name: 73,
    uv: 3030,
    pv: 168,
    amt: 788,
  },
  {
    name: 78,
    uv: 3566,
    pv: 165,
    amt: 310,
  },
  {
    name: 57,
    uv: 1773,
    pv: 452,
    amt: 685,
  },
  {
    name: 45,
    uv: 4013,
    pv: 89,
    amt: 868,
  },
  {
    name: 76,
    uv: 3476,
    pv: 192,
    amt: 538,
  },
  {
    name: 50,
    uv: 339,
    pv: 426,
    amt: 945,
  },
  {
    name: 39,
    uv: 1732,
    pv: 302,
    amt: 393,
  },
  {
    name: 22,
    uv: 1165,
    pv: 9,
    amt: 880,
  },
  {
    name: 20,
    uv: 1806,
    pv: 312,
    amt: 722,
  },
  {
    name: 51,
    uv: 2745,
    pv: 15,
    amt: 415,
  },
  {
    name: 84,
    uv: 3508,
    pv: 10,
    amt: 684,
  },
  {
    name: 94,
    uv: 1913,
    pv: 450,
    amt: 968,
  },
  {
    name: 28,
    uv: 3337,
    pv: 158,
    amt: 711,
  },
  {
    name: 74,
    uv: 1975,
    pv: 131,
    amt: 863,
  },
  {
    name: 46,
    uv: 638,
    pv: 355,
    amt: 590,
  },
  {
    name: 6,
    uv: 2671,
    pv: 400,
    amt: 542,
  },
  {
    name: 54,
    uv: 1848,
    pv: 232,
    amt: 836,
  },
  {
    name: 81,
    uv: 537,
    pv: 99,
    amt: 561,
  },
  {
    name: 47,
    uv: 1496,
    pv: 179,
    amt: 329,
  },
  {
    name: 7,
    uv: 4721,
    pv: 149,
    amt: 873,
  },
  {
    name: 73,
    uv: 3719,
    pv: 310,
    amt: 390,
  },
  {
    name: 56,
    uv: 3484,
    pv: 426,
    amt: 958,
  },
  {
    name: 85,
    uv: 3209,
    pv: 442,
    amt: 726,
  },
  {
    name: 71,
    uv: 4633,
    pv: 3,
    amt: 865,
  },
  {
    name: 42,
    uv: 671,
    pv: 33,
    amt: 273,
  },
  {
    name: 60,
    uv: 4797,
    pv: 449,
    amt: 516,
  },
  {
    name: 17,
    uv: 1602,
    pv: 201,
    amt: 739,
  },
  {
    name: 1,
    uv: 1836,
    pv: 335,
    amt: 706,
  },
  {
    name: 47,
    uv: 4704,
    pv: 322,
    amt: 816,
  },
  {
    name: 66,
    uv: 3766,
    pv: 409,
    amt: 697,
  },
  {
    name: 21,
    uv: 766,
    pv: 196,
    amt: 467,
  },
  {
    name: 47,
    uv: 4577,
    pv: 293,
    amt: 652,
  },
  {
    name: 25,
    uv: 4835,
    pv: 72,
    amt: 622,
  },
  {
    name: 16,
    uv: 2802,
    pv: 392,
    amt: 982,
  },
  {
    name: 23,
    uv: 1068,
    pv: 364,
    amt: 749,
  },
  {
    name: 11,
    uv: 2069,
    pv: 419,
    amt: 93,
  },
  {
    name: 30,
    uv: 2341,
    pv: 343,
    amt: 838,
  },
  {
    name: 31,
    uv: 4354,
    pv: 142,
    amt: 244,
  },
  {
    name: 38,
    uv: 3253,
    pv: 422,
    amt: 572,
  },
  {
    name: 83,
    uv: 122,
    pv: 31,
    amt: 920,
  },
  {
    name: 62,
    uv: 2776,
    pv: 65,
    amt: 560,
  },
  {
    name: 9,
    uv: 3649,
    pv: 17,
    amt: 848,
  },
  {
    name: 5,
    uv: 4256,
    pv: 163,
    amt: 497,
  },
  {
    name: 93,
    uv: 1933,
    pv: 354,
    amt: 860,
  },
  {
    name: 37,
    uv: 1689,
    pv: 388,
    amt: 448,
  },
  {
    name: 65,
    uv: 4031,
    pv: 136,
    amt: 411,
  },
  {
    name: 41,
    uv: 470,
    pv: 318,
    amt: 316,
  },
  {
    name: 6,
    uv: 4417,
    pv: 286,
    amt: 376,
  },
  {
    name: 38,
    uv: 2637,
    pv: 12,
    amt: 212,
  },
  {
    name: 97,
    uv: 2401,
    pv: 391,
    amt: 240,
  },
  {
    name: 1,
    uv: 1618,
    pv: 254,
    amt: 604,
  },
  {
    name: 95,
    uv: 185,
    pv: 412,
    amt: 486,
  },
  {
    name: 83,
    uv: 3640,
    pv: 170,
    amt: 352,
  },
  {
    name: 34,
    uv: 3368,
    pv: 6,
    amt: 347,
  },
  {
    name: 34,
    uv: 3692,
    pv: 21,
    amt: 906,
  },
  {
    name: 62,
    uv: 4031,
    pv: 377,
    amt: 222,
  },
  {
    name: 90,
    uv: 816,
    pv: 71,
    amt: 305,
  },
  {
    name: 13,
    uv: 2993,
    pv: 57,
    amt: 226,
  },
  {
    name: 43,
    uv: 2882,
    pv: 149,
    amt: 307,
  },
  {
    name: 70,
    uv: 4746,
    pv: 168,
    amt: 497,
  },
  {
    name: 21,
    uv: 118,
    pv: 245,
    amt: 185,
  },
  {
    name: 20,
    uv: 4204,
    pv: 150,
    amt: 528,
  },
  {
    name: 25,
    uv: 1162,
    pv: 282,
    amt: 569,
  },
  {
    name: 15,
    uv: 4388,
    pv: 205,
    amt: 675,
  },
  {
    name: 14,
    uv: 229,
    pv: 259,
    amt: 5,
  },
  {
    name: 12,
    uv: 2638,
    pv: 274,
    amt: 83,
  },
  {
    name: 72,
    uv: 4509,
    pv: 15,
    amt: 685,
  },
  {
    name: 43,
    uv: 4320,
    pv: 282,
    amt: 502,
  },
  {
    name: 15,
    uv: 1433,
    pv: 472,
    amt: 121,
  },
  {
    name: 49,
    uv: 4582,
    pv: 391,
    amt: 245,
  },
  {
    name: 1,
    uv: 2173,
    pv: 428,
    amt: 849,
  },
  {
    name: 72,
    uv: 3775,
    pv: 328,
    amt: 767,
  },
  {
    name: 29,
    uv: 3986,
    pv: 302,
    amt: 382,
  },
  {
    name: 100,
    uv: 1326,
    pv: 428,
    amt: 880,
  },
  {
    name: 32,
    uv: 3050,
    pv: 414,
    amt: 959,
  },
];

function ViewCount() {
  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 30" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#007533" fill="#007533" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ViewCount;
