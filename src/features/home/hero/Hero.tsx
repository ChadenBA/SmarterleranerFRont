import { HeaderContainer, HeaderContent, HeaderImage } from "./hero.style";
import { useTranslation } from "react-i18next";

import header from "@assets/images/header.png";
import courses from "@assets/images/courses.webp";
import online from "@assets/images/online.webp";
import students from "@assets/images/students.png";
import teachers from "@assets/images/teachers.webp";
import star from "@assets/images/star.png";

import { GLOBAL_VARIABLES } from "@config/constants/globalVariables";
import StatsticsCard from "./statisticsCard/StatisticsCard";
import { StatsCardsContainer } from "./statisticsCard/statisticsCard.style";
import { Stack } from "@mui/material";
import { BLUE } from "@config/colors/colors";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <h1>{t("home.title")}</h1>
          <h2>{t("home.description")}</h2>

          <Stack direction={'column'} spacing={2}>
          <Stack
            direction={"row"}
            sx={{ color: BLUE.main }}
            alignItems={"center"}
            spacing={2}
          >
            <img src={star} alt="star" width={20} height={20} />
            <h3>{t("home.hero_description_1")}</h3>
          </Stack>
          <Stack
            direction={"row"}
            sx={{ color: BLUE.main }}
            alignItems={"center"}
            spacing={2}
          >
            <img src={star} alt="star" width={20} height={20} />
            <h3>{t("home.hero_description_2")}</h3>
          </Stack>
          <Stack
            direction={"row"}
            sx={{ color: BLUE.main }}
            alignItems={"center"}
            spacing={2}
          >
            <img src={star} alt="star" width={20} height={20} />
            <h3>{t("home.hero_description_3")}</h3>
          </Stack>
          </Stack>
        </HeaderContent>
        <HeaderImage src={header} alt={GLOBAL_VARIABLES.APP_NAME} />
      </HeaderContainer>

      <StatsCardsContainer columnGap={2}>
        <StatsticsCard
          image={courses}
          number="1K" // from the database
          label={t("home.cerified_courses")}
        />
        <StatsticsCard
          image={teachers}
          number="26+" // from the database
          label={t("home.expert_tutors")}
        />
        <StatsticsCard
          image={online}
          number="1K" // from the database
          label={t("home.online_courses")}
        />
        <StatsticsCard
          image={students}
          number="10K" // from the database
          label={t("home.students")}
        />
      </StatsCardsContainer>
    </>
  );
}
