<h1 align="center">
  <b>phc-bcrypt</b>
</h1>
<p align="center">
  <!-- CI - TravisCI -->
  <a href="https://travis-ci.com/simonepri/phc-bcrypt">
    <img src="https://img.shields.io/travis/com/simonepri/phc-bcrypt/master.svg?label=MacOS%20%26%20Linux" alt="Mac/Linux Build Status" />
  </a>
  <!-- CI - AppVeyor -->
  <a href="https://ci.appveyor.com/project/simonepri/phc-bcrypt">
    <img src="https://img.shields.io/appveyor/ci/simonepri/phc-bcrypt/master.svg?label=Windows" alt="Windows Build status" />
  </a>
  <!-- Coverage - Codecov -->
  <a href="https://codecov.io/gh/simonepri/phc-bcrypt">
    <img src="https://img.shields.io/codecov/c/github/simonepri/phc-bcrypt/master.svg" alt="Codecov Coverage report" />
  </a>
  <!-- DM - Snyk -->
  <a href="https://snyk.io/test/github/simonepri/phc-bcrypt?targetFile=package.json">
    <img src="https://snyk.io/test/github/simonepri/phc-bcrypt/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" />
  </a>
  <!-- DM - David -->
  <a href="https://david-dm.org/simonepri/phc-bcrypt">
    <img src="https://david-dm.org/simonepri/phc-bcrypt/status.svg" alt="Dependency Status" />
  </a>

  <br/>

  <!-- Code Style - XO-Prettier -->
  <a href="https://github.com/xojs/xo">
    <img src="https://img.shields.io/badge/code_style-XO+Prettier-5ed9c7.svg" alt="XO Code Style used" />
  </a>
  <!-- Test Runner - AVA -->
  <a href="https://github.com/avajs/ava">
    <img src="https://img.shields.io/badge/test_runner-AVA-fb3170.svg" alt="AVA Test Runner used" />
  </a>
  <!-- Test Coverage - Istanbul -->
  <a href="https://github.com/istanbuljs/nyc">
    <img src="https://img.shields.io/badge/test_coverage-NYC-fec606.svg" alt="Istanbul Test Coverage used" />
  </a>
  <!-- Init - ni -->
  <a href="https://github.com/simonepri/ni">
    <img src="https://img.shields.io/badge/initialized_with-ni-e74c3c.svg" alt="NI Scaffolding System used" />
  </a>
  <!-- Release - np -->
  <a href="https://github.com/sindresorhus/np">
    <img src="https://img.shields.io/badge/released_with-np-6c8784.svg" alt="NP Release System used" />
  </a>

  <br/>

  <!-- Version - npm -->
  <a href="https://www.npmjs.com/package/@phc/bcrypt">
    <img src="https://img.shields.io/npm/v/@phc/bcrypt.svg" alt="Latest version on npm" />
  </a>
  <!-- License - MIT -->
  <a href="https://github.com/simonepri/phc-bcrypt/tree/master/license">
    <img src="https://img.shields.io/github/license/simonepri/phc-bcrypt.svg" alt="Project license" />
  </a>
</p>
<p align="center">
  🔒 Node.JS bcrypt password hashing algorithm following the PHC string format.
  <br/>

  <sub>
    Coded with ❤️ by <a href="#authors">Simone Primarosa</a>.
  </sub>
</p>

## PHC String Format

The [PHC String Format][specs:phc] is an attempt to specify a common hash string format that’s a restricted & well defined subset of the Modular Crypt Format. New hashes are strongly encouraged to adhere to the PHC specification, rather than the much looser [Modular Crypt Format][specs:mcf].

The hash strings generated by this package are in the following format:

```c
$bcrypt$v=<version>r=<rounds>$<salt>$<hash>
```

Where:

| Field | Type | Description
| --- | --- | --- |
| `<version>` | <code>number</code> | The version of the bcrypt algorithm used. |
| `<rounds>` | <code>number</code> | The cost of processing data encoded as log2(iterations). |
| `<salt>` | <code>string</code> | A sequence of bits, known as a [cryptographic salt][specs:salt] encoded in [B64][specs:B64]. |
| `<hash>` | <code>string</code> | The computed derived key by the [bcrypt][specs:bcrypt] algorithm encoded in [B64][specs:B64]. |

For more details consult the bcrypt paper [here][paper].

## Install

```bash
npm install --save @phc/bcrypt
```

## Usage

```js
const bcrypt = require('@phc/bcrypt');

// Hash and verify with bcrypt and default configs
const hash = await bcrypt.hash('password');
// => $bcrypt$v=98$r=10$Fu+++1sHIGTodjyG4pF4Sw$QlOihTVOARhpV0EiWv4k10i5Pw5Hm0E

const match = await bcrypt.verify(hash, 'password');
// => true

const match = await bcrypt.verify(hash, 'wrong');
// => false

const ids = bcrypt.identifiers();
// => ['bcrypt']
```

## Benchmarks

Below you can find usage statistics of this hashing algorithm with different
options.  
This should help you understand how the different options affects the running
time and memory usage of the algorithm.

Usage reports are generated thanks to [sympact][gh:sympact].

<details>
<summary><strong>System Report</strong> ↴</summary>

```
Distro    Release  Platform  Arch
--------  -------  --------  ----
Mac OS X  10.12.6  darwin    x64

CPU     Brand           Clock     Cores
------  --------------  --------  -----
Intel®  Core™ i5-6360U  2.00 GHz  4    

Memory                  Type    Size         Clock   
----------------------  ------  -----------  --------
Micron Technology Inc.  LPDDR3  4294.967 MB  1867 MHz
Micron Technology Inc.  LPDDR3  4294.967 MB  1867 MHz
```

</details>

<details>
<summary><strong>Default options</strong> - <i>{cost:10}</i> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
205.71 % ± 149.94 %      0.00 % … 480.00 %          

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
26.638 MB ± 2.191 MB     21.438 MB … 27.787 MB      

Execution time  Sampling time  Samples  
--------------  -------------  ---------
0.161 s         0.233 s        7 samples

Instant  CPU Usage  RAM Usage  PIDS
-------  ---------  ---------  -----
0.040 s  480.00 %   21.438 MB  31313
0.102 s  360.00 %   26.190 MB  31313
0.134 s  180.00 %   27.754 MB  31313
0.162 s  180.00 %   27.754 MB  31313
0.189 s  120.00 %   27.754 MB  31313
0.215 s  120.00 %   27.787 MB  31313
0.233 s  0.00 %     27.787 MB  31313
```

</details>

<details>
<summary><strong>Cost of 4</strong> - <i>{rounds:4}</i> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
190.00 % ± 181.38 %      0.00 % … 480.00 %          

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
26.470 MB ± 2.443 MB     21.635 MB … 28.176 MB      

Execution time  Sampling time  Samples  
--------------  -------------  ---------
0.158 s         0.323 s        6 samples

Instant  CPU Usage  RAM Usage  PIDS
-------  ---------  ---------  -----
0.109 s  480.00 %   21.635 MB  31491
0.211 s  300.00 %   24.973 MB  31491
0.262 s  300.00 %   27.681 MB  31491
0.289 s  60.00 %    28.176 MB  31491
0.308 s  0.00 %     28.176 MB  31491
0.323 s  0.00 %     28.176 MB  31491
```

</details>

<details>
<summary><strong>Cost of 8</strong> - <i>{rounds:8}</i> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
93.75 % ± 114.67 %       0.00 % … 300.00 %          

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
26.556 MB ± 2.101 MB     21.651 MB … 27.976 MB      

Execution time  Sampling time  Samples  
--------------  -------------  ---------
0.293 s         0.494 s        8 samples

Instant  CPU Usage  RAM Usage  PIDS
-------  ---------  ---------  -----
0.079 s  270.00 %   21.651 MB  31602
0.226 s  300.00 %   25.137 MB  31602
0.311 s  0.00 %     26.173 MB  31602
0.342 s  90.00 %    27.619 MB  31602
0.364 s  60.00 %    27.939 MB  31602
0.445 s  30.00 %    27.976 MB  31602
0.492 s  0.00 %     27.976 MB  31602
0.494 s  0.00 %     27.976 MB  31602
```

</details>

<details>
<summary><strong>Cost of 12</strong> - <i>{rounds:12}</i> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
155.00 % ± 101.61 %      0.00 % … 480.00 %          

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
27.131 MB ± 1.720 MB     21.631 MB … 27.988 MB      

Execution time  Sampling time  Samples   
--------------  -------------  ----------
0.486 s         0.575 s        18 samples

Instant  CPU Usage  RAM Usage  PIDS
-------  ---------  ---------  -----
0.057 s  480.00 %   21.631 MB  32051
0.127 s  300.00 %   24.285 MB  32051
0.157 s  120.00 %   25.219 MB  32051
0.185 s  120.00 %   25.833 MB  32051
0.214 s  180.00 %   27.951 MB  32051
0.235 s  120.00 %   27.951 MB  32051
0.264 s  120.00 %   27.951 MB  32051
0.295 s  180.00 %   27.951 MB  32051
0.324 s  180.00 %   27.951 MB  32051
0.354 s  180.00 %   27.951 MB  32051
0.383 s  180.00 %   27.951 MB  32051
0.411 s  180.00 %   27.951 MB  32051
0.439 s  120.00 %   27.951 MB  32051
0.469 s  90.00 %    27.951 MB  32051
0.497 s  90.00 %    27.951 MB  32051
0.532 s  120.00 %   27.951 MB  32051
0.556 s  30.00 %    27.988 MB  32051
0.575 s  0.00 %     27.988 MB  32051
```

</details>

<details>
<summary><strong>Cost of 14</strong> - <i>{rounds:14}</i> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
112.91 % ± 75.45 %       0.00 % … 420.00 %          

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
27.983 MB ± 0.905 MB     21.705 MB … 28.176 MB      

Execution time  Sampling time  Samples   
--------------  -------------  ----------
1.608 s         1.68 s         55 samples

Instant  CPU Usage  RAM Usage  PIDS
-------  ---------  ---------  -----
0.039 s  420.00 %   21.705 MB  32176
0.104 s  420.00 %   25.899 MB  32176
0.145 s  180.00 %   28.140 MB  32176
0.180 s  180.00 %   28.140 MB  32176
0.211 s  180.00 %   28.140 MB  32176
0.234 s  120.00 %   28.140 MB  32176
0.258 s  120.00 %   28.140 MB  32176
0.291 s  180.00 %   28.140 MB  32176
0.334 s  180.00 %   28.140 MB  32176
0.361 s  60.00 %    28.140 MB  32176
0.383 s  180.00 %   28.140 MB  32176
0.416 s  120.00 %   28.140 MB  32176
0.445 s  180.00 %   28.140 MB  32176
0.473 s  180.00 %   28.140 MB  32176
0.501 s  120.00 %   28.140 MB  32176
0.531 s  180.00 %   28.140 MB  32176
0.561 s  120.00 %   28.140 MB  32176
0.589 s  180.00 %   28.140 MB  32176
0.616 s  120.00 %   28.140 MB  32176
0.646 s  180.00 %   28.140 MB  32176
0.677 s  90.00 %    28.140 MB  32176
0.706 s  60.00 %    28.140 MB  32176
0.743 s  90.00 %    28.140 MB  32176
0.777 s  90.00 %    28.140 MB  32176
0.804 s  60.00 %    28.140 MB  32176
0.828 s  90.00 %    28.140 MB  32176
0.859 s  60.00 %    28.140 MB  32176
0.887 s  90.00 %    28.140 MB  32176
0.916 s  90.00 %    28.140 MB  32176
0.952 s  90.00 %    28.140 MB  32176
0.981 s  60.00 %    28.140 MB  32176
1.024 s  60.00 %    28.140 MB  32176
1.058 s  90.00 %    28.140 MB  32176
1.083 s  60.00 %    28.140 MB  32176
1.113 s  90.00 %    28.140 MB  32176
1.140 s  0.00 %     28.140 MB  32176
1.170 s  60.00 %    28.140 MB  32176
1.199 s  90.00 %    28.140 MB  32176
1.227 s  90.00 %    28.140 MB  32176
1.255 s  90.00 %    28.140 MB  32176
1.284 s  60.00 %    28.140 MB  32176
1.313 s  90.00 %    28.140 MB  32176
1.342 s  60.00 %    28.140 MB  32176
1.370 s  90.00 %    28.140 MB  32176
1.397 s  90.00 %    28.140 MB  32176
1.428 s  90.00 %    28.140 MB  32176
1.456 s  60.00 %    28.140 MB  32176
1.484 s  90.00 %    28.140 MB  32176
1.511 s  90.00 %    28.140 MB  32176
1.541 s  60.00 %    28.140 MB  32176
1.578 s  120.00 %   28.140 MB  32176
1.601 s  60.00 %    28.140 MB  32176
1.629 s  60.00 %    28.140 MB  32176
1.655 s  90.00 %    28.176 MB  32176
1.680 s  0.00 %     28.176 MB  32176
```

</details>

<details>
<summary><strong>Cost of 16</strong> - <i>{rounds:16}</i> ↴</summary>

```
CPU Usage (avarage ± σ)  CPU Usage Range (min … max)
-----------------------  ---------------------------
40.42 % ± 47.22 %        0.00 % … 540.00 %          

RAM Usage (avarage ± σ)  RAM Usage Range (min … max)
-----------------------  ---------------------------
27.793 MB ± 0.487 MB     21.656 MB … 27.881 MB      

Execution time  Sampling time  Samples    
--------------  -------------  -----------
7.237 s         7.322 s        236 samples

Instant  CPU Usage  RAM Usage  PIDS
-------  ---------  ---------  -----
0.046 s  540.00 %   21.656 MB  32810
0.219 s  300.00 %   24.527 MB  32810
0.261 s  180.00 %   25.407 MB  32810
0.292 s  180.00 %   26.694 MB  32810
0.300 s  60.00 %    27.673 MB  32810
0.326 s  120.00 %   27.849 MB  32810
0.353 s  120.00 %   27.849 MB  32810
0.383 s  180.00 %   27.849 MB  32810
0.409 s  120.00 %   27.849 MB  32810
0.440 s  180.00 %   27.849 MB  32810
0.472 s  120.00 %   27.849 MB  32810
0.511 s  90.00 %    27.849 MB  32810
0.554 s  90.00 %    27.849 MB  32810
0.577 s  60.00 %    27.849 MB  32810
0.605 s  60.00 %    27.849 MB  32810
0.627 s  60.00 %    27.849 MB  32810
0.657 s  90.00 %    27.849 MB  32810
0.688 s  90.00 %    27.849 MB  32810
0.721 s  90.00 %    27.849 MB  32810
0.743 s  60.00 %    27.849 MB  32810
0.770 s  90.00 %    27.849 MB  32810
0.799 s  90.00 %    27.849 MB  32810
0.827 s  60.00 %    27.849 MB  32810
0.854 s  90.00 %    27.849 MB  32810
0.883 s  90.00 %    27.849 MB  32810
0.928 s  90.00 %    27.849 MB  32810
0.952 s  30.00 %    27.849 MB  32810
0.993 s  60.00 %    27.849 MB  32810
1.025 s  30.00 %    27.849 MB  32810
1.051 s  60.00 %    27.849 MB  32810
1.084 s  60.00 %    27.849 MB  32810
1.108 s  60.00 %    27.849 MB  32810
1.134 s  60.00 %    27.849 MB  32810
1.159 s  60.00 %    27.849 MB  32810
1.187 s  90.00 %    27.849 MB  32810
1.216 s  90.00 %    27.849 MB  32810
1.244 s  60.00 %    27.849 MB  32810
1.274 s  0.00 %     27.849 MB  32810
1.312 s  90.00 %    27.849 MB  32810
1.348 s  60.00 %    27.849 MB  32810
1.379 s  30.00 %    27.849 MB  32810
1.405 s  30.00 %    27.849 MB  32810
1.440 s  90.00 %    27.849 MB  32810
1.467 s  60.00 %    27.849 MB  32810
1.496 s  60.00 %    27.849 MB  32810
1.519 s  60.00 %    27.849 MB  32810
1.548 s  40.00 %    27.849 MB  32810
1.576 s  60.00 %    27.849 MB  32810
1.604 s  60.00 %    27.849 MB  32810
1.645 s  60.00 %    27.849 MB  32810
1.679 s  20.00 %    27.849 MB  32810
1.709 s  40.00 %    27.849 MB  32810
1.738 s  20.00 %    27.849 MB  32810
1.771 s  40.00 %    27.849 MB  32810
1.816 s  60.00 %    27.849 MB  32810
1.877 s  20.00 %    27.849 MB  32810
1.881 s  20.00 %    27.849 MB  32810
1.916 s  40.00 %    27.849 MB  32810
1.944 s  20.00 %    27.849 MB  32810
1.980 s  40.00 %    27.849 MB  32810
2.007 s  20.00 %    27.849 MB  32810
2.035 s  40.00 %    27.849 MB  32810
2.069 s  60.00 %    27.849 MB  32810
2.138 s  40.00 %    27.849 MB  32810
2.147 s  20.00 %    27.849 MB  32810
2.210 s  60.00 %    27.849 MB  32810
2.223 s  40.00 %    27.849 MB  32810
2.262 s  40.00 %    27.849 MB  32810
2.282 s  20.00 %    27.849 MB  32810
2.310 s  40.00 %    27.849 MB  32810
2.330 s  40.00 %    27.849 MB  32810
2.358 s  60.00 %    27.849 MB  32810
2.387 s  40.00 %    27.849 MB  32810
2.458 s  60.00 %    27.849 MB  32810
2.475 s  40.00 %    27.849 MB  32810
2.499 s  20.00 %    27.849 MB  32810
2.535 s  30.00 %    27.849 MB  32810
2.565 s  45.00 %    27.849 MB  32810
2.594 s  30.00 %    27.849 MB  32810
2.620 s  45.00 %    27.849 MB  32810
2.654 s  30.00 %    27.849 MB  32810
2.682 s  30.00 %    27.849 MB  32810
2.708 s  30.00 %    27.849 MB  32810
2.742 s  45.00 %    27.849 MB  32810
2.769 s  30.00 %    27.849 MB  32810
2.798 s  0.00 %     27.849 MB  32810
2.823 s  30.00 %    27.849 MB  32810
2.852 s  45.00 %    27.849 MB  32810
2.880 s  30.00 %    27.849 MB  32810
2.908 s  45.00 %    27.849 MB  32810
2.935 s  30.00 %    27.849 MB  32810
2.963 s  45.00 %    27.849 MB  32810
2.991 s  45.00 %    27.849 MB  32810
3.034 s  30.00 %    27.849 MB  32810
3.069 s  45.00 %    27.849 MB  32810
3.099 s  15.00 %    27.849 MB  32810
3.151 s  30.00 %    27.849 MB  32810
3.195 s  30.00 %    27.849 MB  32810
3.200 s  15.00 %    27.849 MB  32810
3.234 s  45.00 %    27.849 MB  32810
3.259 s  30.00 %    27.849 MB  32810
3.288 s  30.00 %    27.849 MB  32810
3.324 s  30.00 %    27.849 MB  32810
3.348 s  45.00 %    27.849 MB  32810
3.372 s  30.00 %    27.849 MB  32810
3.395 s  30.00 %    27.849 MB  32810
3.428 s  45.00 %    27.849 MB  32810
3.455 s  45.00 %    27.849 MB  32810
3.479 s  45.00 %    27.849 MB  32810
3.515 s  24.00 %    27.849 MB  32810
3.550 s  48.00 %    27.849 MB  32810
3.571 s  24.00 %    27.849 MB  32810
3.598 s  36.00 %    27.849 MB  32810
3.626 s  36.00 %    27.849 MB  32810
3.659 s  24.00 %    27.849 MB  32810
3.702 s  24.00 %    27.849 MB  32810
3.727 s  24.00 %    27.849 MB  32810
3.752 s  36.00 %    27.849 MB  32810
3.791 s  24.00 %    27.849 MB  32810
3.822 s  24.00 %    27.849 MB  32810
3.897 s  12.00 %    27.849 MB  32810
3.902 s  12.00 %    27.849 MB  32810
3.945 s  48.00 %    27.849 MB  32810
3.978 s  36.00 %    27.849 MB  32810
4.016 s  36.00 %    27.849 MB  32810
4.046 s  24.00 %    27.849 MB  32810
4.074 s  24.00 %    27.849 MB  32810
4.106 s  24.00 %    27.849 MB  32810
4.136 s  0.00 %     27.849 MB  32810
4.172 s  24.00 %    27.849 MB  32810
4.209 s  24.00 %    27.849 MB  32810
4.244 s  12.00 %    27.849 MB  32810
4.269 s  12.00 %    27.849 MB  32810
4.302 s  24.00 %    27.849 MB  32810
4.330 s  24.00 %    27.849 MB  32810
4.366 s  36.00 %    27.849 MB  32810
4.392 s  24.00 %    27.849 MB  32810
4.428 s  24.00 %    27.849 MB  32810
4.460 s  24.00 %    27.849 MB  32810
4.521 s  10.00 %    27.849 MB  32810
4.556 s  10.00 %    27.849 MB  32810
4.565 s  20.00 %    27.849 MB  32810
4.602 s  20.00 %    27.849 MB  32810
4.635 s  20.00 %    27.849 MB  32810
4.666 s  20.00 %    27.849 MB  32810
4.688 s  10.00 %    27.849 MB  32810
4.729 s  30.00 %    27.849 MB  32810
4.758 s  30.00 %    27.849 MB  32810
4.784 s  20.00 %    27.849 MB  32810
4.808 s  20.00 %    27.849 MB  32810
4.836 s  30.00 %    27.849 MB  32810
4.866 s  20.00 %    27.849 MB  32810
4.907 s  30.00 %    27.849 MB  32810
4.932 s  20.00 %    27.849 MB  32810
4.955 s  20.00 %    27.849 MB  32810
4.983 s  30.00 %    27.849 MB  32810
5.011 s  20.00 %    27.849 MB  32810
5.039 s  30.00 %    27.849 MB  32810
5.067 s  20.00 %    27.849 MB  32810
5.095 s  30.00 %    27.849 MB  32810
5.123 s  20.00 %    27.849 MB  32810
5.153 s  30.00 %    27.849 MB  32810
5.181 s  20.00 %    27.849 MB  32810
5.211 s  30.00 %    27.849 MB  32810
5.240 s  20.00 %    27.849 MB  32810
5.268 s  30.00 %    27.849 MB  32810
5.296 s  30.00 %    27.849 MB  32810
5.325 s  20.00 %    27.849 MB  32810
5.354 s  30.00 %    27.849 MB  32810
5.384 s  30.00 %    27.849 MB  32810
5.411 s  20.00 %    27.849 MB  32810
5.449 s  30.00 %    27.849 MB  32810
5.480 s  20.00 %    27.849 MB  32810
5.506 s  0.00 %     27.849 MB  32810
5.543 s  17.14 %    27.849 MB  32810
5.594 s  25.71 %    27.849 MB  32810
5.618 s  8.57 %     27.849 MB  32810
5.644 s  17.14 %    27.849 MB  32810
5.669 s  17.14 %    27.849 MB  32810
5.696 s  17.14 %    27.849 MB  32810
5.735 s  25.71 %    27.849 MB  32810
5.762 s  17.14 %    27.849 MB  32810
5.784 s  17.14 %    27.849 MB  32810
5.811 s  25.71 %    27.849 MB  32810
5.841 s  17.14 %    27.849 MB  32810
5.870 s  25.71 %    27.849 MB  32810
5.897 s  17.14 %    27.849 MB  32810
5.926 s  25.71 %    27.849 MB  32810
5.957 s  25.71 %    27.849 MB  32810
5.988 s  25.71 %    27.849 MB  32810
6.020 s  25.71 %    27.849 MB  32810
6.051 s  17.14 %    27.849 MB  32810
6.083 s  25.71 %    27.849 MB  32810
6.124 s  25.71 %    27.849 MB  32810
6.146 s  17.14 %    27.849 MB  32810
6.171 s  25.71 %    27.849 MB  32810
6.199 s  17.14 %    27.849 MB  32810
6.226 s  25.71 %    27.849 MB  32810
6.262 s  25.71 %    27.849 MB  32810
6.291 s  25.71 %    27.849 MB  32810
6.311 s  17.14 %    27.849 MB  32810
6.340 s  25.71 %    27.849 MB  32810
6.367 s  17.14 %    27.849 MB  32810
6.396 s  25.71 %    27.849 MB  32810
6.424 s  17.14 %    27.849 MB  32810
6.454 s  25.71 %    27.849 MB  32810
6.483 s  17.14 %    27.849 MB  32810
6.511 s  22.50 %    27.849 MB  32810
6.539 s  15.00 %    27.849 MB  32810
6.568 s  22.50 %    27.849 MB  32810
6.597 s  22.50 %    27.849 MB  32810
6.626 s  15.00 %    27.849 MB  32810
6.659 s  22.50 %    27.849 MB  32810
6.690 s  0.00 %     27.849 MB  32810
6.719 s  15.00 %    27.849 MB  32810
6.747 s  22.50 %    27.849 MB  32810
6.776 s  15.00 %    27.849 MB  32810
6.808 s  22.50 %    27.849 MB  32810
6.841 s  22.50 %    27.849 MB  32810
6.871 s  15.00 %    27.849 MB  32810
6.899 s  22.50 %    27.849 MB  32810
6.927 s  22.50 %    27.849 MB  32810
6.974 s  30.00 %    27.849 MB  32810
7.006 s  22.50 %    27.849 MB  32810
7.029 s  15.00 %    27.849 MB  32810
7.050 s  15.00 %    27.849 MB  32810
7.078 s  15.00 %    27.849 MB  32810
7.105 s  22.50 %    27.849 MB  32810
7.137 s  30.00 %    27.849 MB  32810
7.167 s  15.00 %    27.849 MB  32810
7.195 s  22.50 %    27.849 MB  32810
7.225 s  22.50 %    27.849 MB  32810
7.254 s  22.50 %    27.849 MB  32810
7.282 s  15.00 %    27.849 MB  32810
7.319 s  7.50 %     27.881 MB  32810
7.322 s  0.00 %     27.881 MB  32810
```

</details>

## Test vectors

The [bcrypt paper][paper] does not lists test vectors to test implementation but
a set of well known test vectors has been used.  
This package implements them [here][tvec].

## API

#### TOC

<dl>
<dt><a href="#hash">hash(password, [options])</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Computes the hash string of the given password in the PHC format using bcrypt
package.</p>
</dd>
<dt><a href="#verify">verify(phcstr, password)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>Determines whether or not the hash stored inside the PHC formatted string
matches the hash generated for the password provided.</p>
</dd>
<dt><a href="#identifiers">identifiers()</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Gets the list of all identifiers supported by this hashing function.</p>
</dd>
</dl>

<a name="hash"></a>

### hash(password, [options]) ⇒ <code>Promise.&lt;string&gt;</code>
Computes the hash string of the given password in the PHC format using bcrypt
package.

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - The generated secure hash string in the PHC
format.  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| password | <code>string</code> |  | The password to hash. |
| [options] | <code>Object</code> |  | Optional configurations related to the hashing function. |
| [options.rounds] | <code>number</code> | <code>10</code> | Optional Must be an integer within the range (`4` <= `rounds` <= `31`). |

<a name="verify"></a>

### verify(phcstr, password) ⇒ <code>Promise.&lt;boolean&gt;</code>
Determines whether or not the hash stored inside the PHC formatted string
matches the hash generated for the password provided.

**Kind**: global function  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - A boolean that is true if the hash computed
for the password matches.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| phcstr | <code>string</code> | Secure hash string generated from this package. |
| password | <code>string</code> | User's password input. |

<a name="identifiers"></a>

### identifiers() ⇒ <code>Array.&lt;string&gt;</code>
Gets the list of all identifiers supported by this hashing function.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - A list of identifiers supported by this hashing function.  
**Access**: public  

## Related
- [@phc/argon2][argon2] -
🔒 Node.JS Argon2 password hashing algorithm following the PHC string format.
- [@phc/scrypt][scrypt] -
🔒 Node.JS scrypt password hashing algorithm following the PHC string format.
- [@phc/pbkdf2][pbkdf2] -
🔒 Node.JS PBKDF2 password hashing algorithm following the PHC string format.

## Contributing

Contributions are REALLY welcome and if you find a security flaw in this code, PLEASE [report it][new issue].  

## Authors

- **Simone Primarosa** - *Github* ([@simonepri][github:simonepri]) • *Twitter* ([@simoneprimarosa][twitter:simoneprimarosa])

See also the list of [contributors][contributors] who participated in this project.

## License

This project is licensed under the MIT License - see the [license][license] file for details.

<!-- Links -->
[start]: https://github.com/simonepri/phc-bcrypt#start-of-content
[new issue]: https://github.com/simonepri/phc-bcrypt/issues/new
[contributors]: https://github.com/simonepri/phc-bcrypt/contributors

[license]: https://github.com/simonepri/phc-bcrypt/tree/master/license

[tvec]: https://github.com/simonepri/phc-bcrypt/tree/master/test/vectors.js

[argon2]: https://github.com/simonepri/phc-argon2
[scrypt]: https://github.com/simonepri/phc-scrypt
[pbkdf2]: https://github.com/simonepri/phc-pbkdf2

[github:simonepri]: https://github.com/simonepri
[twitter:simoneprimarosa]: http://twitter.com/intent/user?screen_name=simoneprimarosa

[gh:sympact]: https://github.com/simonepri/sympact

[specs:mcf]: https://github.com/ademarre/binary-mcf
[specs:phc]: https://github.com/P-H-C/phc-string-format/blob/master/phc-sf-spec.md
[specs:B64]: https://github.com/P-H-C/phc-string-format/blob/master/phc-sf-spec.md#b64
[specs:salt]: https://en.wikipedia.org/wiki/Salt_(cryptography)
[specs:bcrypt]: https://en.wikipedia.org/wiki/bcrypt

[paper]: https://www.usenix.org/legacy/event/usenix99/provos/provos.pdf