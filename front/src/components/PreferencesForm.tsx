import { useState } from "react";
import {
  FixedCenterModal,
  PageWrapper,
  ButtonContainer,
  ButtonStyled,
  BackButtonStyled,
} from "../styles/preferences.styles";
import SelectLikes from "./SelectLIkes";
import SelectDislikes from "./SelectDislikes";
import { setPreferences } from "../api/preferences";
import { useNavigate } from "react-router-dom";

export default function PreferencesForm({
  page,
  setPage,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const navigate = useNavigate();
  const [userPreferences, setUserPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    healthy: false,
    likes: [] as string[],
    dislikes: [] as string[],
  });

  const handlePreferences = (preference: string, value: boolean) => {
    setUserPreferences((prev) => ({
      ...prev,
      [preference]: value,
    }));
    if (page == 6) {
      console.log(userPreferences);
    }
    setPage((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await setPreferences(userPreferences);
      console.log(response);
      localStorage.removeItem("preferences");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <FixedCenterModal>
        <BackButtonStyled
          onClick={() => setPage((prev) => (prev == 0 ? 0 : prev - 1))}
        >
          {"<-"}
        </BackButtonStyled>

        {page === 0 && (
          <PageWrapper className="flex justify-between flex-col h-full items-center">
            <p className="font-extrabold text-xl">Are you a vegetarian?</p>
            <ButtonContainer className="flex justify-between w-full">
              <ButtonStyled
                onClick={() => handlePreferences("vegetarian", false)}
              >
                No
              </ButtonStyled>
              <ButtonStyled
                onClick={() => handlePreferences("vegetarian", true)}
              >
                Yes
              </ButtonStyled>
            </ButtonContainer>
          </PageWrapper>
        )}
        {/* page 1 */}
        {page === 1 && (
          <PageWrapper className="flex justify-between flex-col h-full items-center">
            <p className="font-extrabold text-xl">Are you a vegan?</p>
            <ButtonContainer className="flex justify-between w-full">
              <ButtonStyled onClick={() => handlePreferences("vegan", false)}>
                No
              </ButtonStyled>
              <ButtonStyled onClick={() => handlePreferences("vegan", true)}>
                Yes
              </ButtonStyled>
            </ButtonContainer>
          </PageWrapper>
        )}
        {/* page 2 */}
        {page === 2 && (
          <PageWrapper className="flex justify-between flex-col h-full items-center">
            <p className="font-extrabold text-xl">Are you gluten-free?</p>
            <ButtonContainer className="flex justify-between w-full">
              <ButtonStyled
                onClick={() => handlePreferences("glutenFree", false)}
              >
                No
              </ButtonStyled>
              <ButtonStyled
                onClick={() => handlePreferences("glutenFree", true)}
              >
                Yes
              </ButtonStyled>
            </ButtonContainer>
          </PageWrapper>
        )}
        {/* page 3 */}
        {page === 3 && (
          <PageWrapper className="flex justify-between flex-col h-full items-center">
            <p className="font-extrabold text-xl">Are you dairy-free?</p>
            <ButtonContainer className="flex justify-between w-full">
              <ButtonStyled
                onClick={() => handlePreferences("dairyFree", false)}
              >
                No
              </ButtonStyled>
              <ButtonStyled
                onClick={() => handlePreferences("dairyFree", true)}
              >
                Yes
              </ButtonStyled>
            </ButtonContainer>
          </PageWrapper>
        )}
        {/* page 4 */}
        {page === 4 && (
          <PageWrapper className="flex justify-between flex-col h-full items-center">
            <p className="font-extrabold text-xl">
              Do you prefer healthy choices?
            </p>
            <ButtonContainer className="flex justify-between w-full">
              <ButtonStyled onClick={() => handlePreferences("healthy", false)}>
                No
              </ButtonStyled>
              <ButtonStyled onClick={() => handlePreferences("healthy", true)}>
                Yes
              </ButtonStyled>
            </ButtonContainer>
          </PageWrapper>
        )}
        {/* page 5 */}
        {page === 5 && (
          <PageWrapper className="flex justify-between flex-col h-full items-center">
            <p className="font-extrabold text-xl">What do you like?</p>
            <SelectLikes
              setPage={setPage}
              userPreferences={userPreferences}
              setUserPreferences={setUserPreferences}
            />
          </PageWrapper>
        )}
        {/* page 6 */}
        {page === 6 && (
          <PageWrapper className="flex justify-between flex-col h-full items-center">
            <p className="font-extrabold text-xl">What do you dislike?</p>
            <SelectDislikes
              handleSubmit={handleSubmit}
              userPreferences={userPreferences}
              setUserPreferences={setUserPreferences}
            />
          </PageWrapper>
        )}
      </FixedCenterModal>
    </>
  );
}
