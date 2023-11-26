import React from "react";
import { Image, Box } from "@chakra-ui/react";
// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";
export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="center" direction="column">
      <Image
        boxSize="200px"
        objectFit="cover"
        src="https://lh3.googleusercontent.com/fife/AK0iWDyVePL-CyLW91yNiryjiC-Ni9yG8tKv_YcAiJnz_PGxXayzglO6yoq-eUATs9AfpjYDhStXZHmxOTXxA0FDvNi5jf1ytwaFDCQ-B17ud06wCkI6ooWyNMMLtsiWsQSCihWecTZJabYbqZ-xS85m-rNkmA497emtjqK9YqCo8_WVFRclp9blMD4IU4isGnti2595FDCwWnp4F1ir5AAh0_Qjz6VkccwUzSb7xPu0UnlSktYAJMRVMMiz-X2DEM6UueRv_CMp9JYNml4Qie5N7KrSSNFImIMdeATrIqrS2GOaGG-NwgViYsLzBid4IIi8QFHHLjOs6hV9LEFzN1UdtJZZr827Pfxr5hMMZ89EzOkD2q1LXKsWGMXp4GEshPeAktMZ0AsVohSuO_nYYvYsAxhLfMy_g-q8gXwvf7JahEoR5TsFYPa7YDbgWKM0oqqnqMfq-TGGzdbbTq7F1ANQbqasCAVx0HBdWboHD-LHAMieo2OBtOmEWG_5g5TFUwVZURVbb_0i-hL2NtLWEP0UGPfd9_8b7O4vSr3RjiBXXvUKNkZ0Ox4GIRXODV1jqvniANXTBOjv5i5cUaYekG9S6pa2HOTaK9X4jGIaO_Ht05xn6mhCusN5AlWsgqSW87URTgN9ZdnPJS5Gr7aKjYiVMyWLR6vkwTx2iRQ-qz_sqHsYVVG7Ijd9T-kQBoQYgbYpRgVLpQksqlnXcWvPWOS-ZxrtKwcnbh7Vg_3zw5IeotfifS7rcbrriaA4ypBLAMMOtP1g6pVCfPegqJjoL-CdDM2Qf_CvXJqCMWhwluA6VN6i7eRuqRCLuhy3gEZdwKc64CsSbMyq22Pt0okpz0N9N0VBK-J-Uz4LJ-JoUTBL8zPepFfHbh1xYwD1Yre01zHsLukOJfkfc1qJ3bahw4V5_v_24B1mHe_XRJc8vIEvJctC0q3-CyDz54h74301TFNtHFzWyW6_qNFc4y29pJMZq3JhpYHtALKtD6H7fHrgvZKAy5wfotXIAlM7yUVJRed1eBuqqV3SxyVs8d11KSCK-XcDiG7KrNezEsqFKGShAe0k_g_8EtM8J34YnbpWQOhqzISp9Bxj8zbdGsl1L4Fj534dJAZqBtlcpFyMb8agG3LCgxw9WIVT098HfY3kZ_ZEprK00m12Gl6rruDy-uNATF1H_kFVbQxL5oggofHaaw6mL9CtVvMbHbg8UHWY9fzL8QeHdKqWu954z2Mi_FaNk2edkrUKBVqVCoOFvl9pjnZgaqGbLKJQv0dXHm2gi83WJaU3d11iTC0xF4RiG1F7nwq3KL_qgczWNKBmEz3q6yTdn_LLGKqFyWQTxngKOo8-c5PXJcwq42MemCbEtPCyt3kIV-DjUAxlDCDKKta9oKzRW3GoV_Cj8oHAKvMeAdHVoP5xT0V31stAtJHmCEistglqopv9nxGVBd1m1Evu44tEl4YGWGrvA0o9qZaPYNIzUUaNWJuoOKtQlTQRlGRAsiOHoPEC8VlRxzUGjXraNvV-6gtfKXVZgir3NoZ18hvoY3Zh0PwZgVrKWQ=w1919-h968"
        alt="Dan Abramov"
      />
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
