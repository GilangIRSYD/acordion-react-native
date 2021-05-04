```javascript

import CAcordion from 'acordion-react-native';


//   Basic Usage
  
  <CAcordion title={"Kurir apa yang mengantarkan modem orbit ?"} styleTextTitle={{fontSize:24 }}>
    <Text>{'1. Kurir JNE'}</Text>
    <Text>{'2. Kurir SI Cepat'}</Text>
    <Text>{'3. Kurir J and T'}</Text>
    <Text>{'4. Kurir TIKI'}</Text>
    <Text>{'5. Kurir GO Send'}</Text>
  </CAcordion>




```




| PROPS            | TYPE              | DESCRIPTION                          | DEFAULT                 |
|------------------|-------------------|--------------------------------------|-------------------------|
| title            |       String      | Title of accordion head              |   "Change title props"  |
| iconSize         |       Number      | Acordion leading icon size           |            25           |
| iconPNG          |       Image       | Acordion leading icon                |           null          |
| iconDropdown     |       Image       | Acordion dropdown icon               | icon-arrow-dropdown.png |
| iconDropdownSize |       Number      | Dropdown acrordion icon size         |            25           |
| styleTextTitle   | Object Stylesheet | Custom style for title text acordion |        undefined        |