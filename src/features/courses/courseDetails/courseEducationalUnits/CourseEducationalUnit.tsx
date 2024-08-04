import { useState } from 'react';
import {
  Avatar,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import { GREY } from '@config/colors/colors';
import { StyledButton, StyledExpandIcon, StyledMediaSection } from './courseEducationalUnits.style';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import play from '@assets/logo/play.svg';
import { CourseEducationalUnitProps } from './CourseEducationalUnit.type';

function CourseEducationalUnit({ eu, los, isEnrolled }: CourseEducationalUnitProps) {
  const [isOpened, setIsOpened] = useState(false);

  const onCollapseClick = () => setIsOpened((prev) => !prev);

  return (
    <>
      <Stack spacing={1}>
        <StyledMediaSection onClick={onCollapseClick}>
          <Typography variant="h6">{eu.title}</Typography>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <IconButton>
              <StyledExpandIcon
                isopened={isOpened ? GLOBAL_VARIABLES.TRUE_STRING : GLOBAL_VARIABLES.FALSE_STRING}
              />
            </IconButton>
          </Stack>
        </StyledMediaSection>
        <Collapse in={isOpened} timeout={200}>
          <Stack>
            <List>
              {los.map((item, index) => (
                <Stack key={index}>
                  <Grid container>
                    <ListItem>
                      <Grid item sm={12}>
                        <Stack direction={'row'} alignItems={'center'}>
                          <Avatar variant="rounded" sx={{ width: 20, height: 20 }} src={play} />
                          <StyledButton disabled={!isEnrolled} onClick={() => {}} variant="text">
                            {item.title}
                          </StyledButton>
                        </Stack>
                        <Divider color={GREY.light} />
                      </Grid>
                    </ListItem>
                  </Grid>
                </Stack>
              ))}
            </List>
          </Stack>
        </Collapse>
      </Stack>
    </>
  );
}

export default CourseEducationalUnit;
