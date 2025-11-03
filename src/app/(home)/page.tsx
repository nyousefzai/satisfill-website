"use client";

import Image from "next/image";
import {
  ComingSoonText,
  Container,
  Content,
  LogoContainer,
  PyramidContainer,
  PyramidSection,
  PyramidText,
  PyramidTextOverflow,
} from "./styles";

export default function Home() {
  return (
    <Container>
      <Content>
        <ComingSoonText>Coming Soon!</ComingSoonText>
        <ComingSoonText>January 2026</ComingSoonText>

        <LogoContainer>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={200}
            height={50}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </LogoContainer>

        <PyramidContainer>
          <PyramidTextOverflow>
            <PyramidSection isTop></PyramidSection>

            <PyramidText>
              The First
              <br />
              Appetite Fulfillment
            </PyramidText>
          </PyramidTextOverflow>

          <PyramidSection>
            <PyramidText>Diet & App</PyramidText>
          </PyramidSection>
        </PyramidContainer>
      </Content>
    </Container>
  );
}
