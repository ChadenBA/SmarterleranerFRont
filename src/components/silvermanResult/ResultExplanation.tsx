import React from 'react';
import { Box, Typography } from '@mui/material';
import { LearningStyleData } from 'types/interfaces/SilvermanResultData';
import useStyles from './ResultExplanation.style'; // Import the styles

interface ResultExplanationProps {
  scores: {
    [key: string]: LearningStyleData;
  };
}

const ResultExplanation: React.FC<ResultExplanationProps> = ({ scores }) => {
  const classes = useStyles();

  const getDescription = (category: string) => {
    const descriptions: { [key: string]: string } = {
      Active: 'Active learners are generally hands-on and prefer engaging in physical activities.',
      Reflective:
        'Reflective learners think things through before acting and prefer to work alone.',
      Intuitive: 'Intuitive learners focus on the big picture and prefer abstract concepts.',
      Sensing:
        'Sensing learners focus on concrete facts and details and prefer hands-on experiences.',
      Auditory: 'Auditory learners prefer to hear information and may benefit from discussions.',
      Visual: 'Visual learners prefer to see information and often use diagrams and charts.',
      Global: 'Global learners see the overall picture and prefer to understand the big picture.',
      Sequential: 'Sequential learners prefer to learn step-by-step and follow a logical sequence.',
    };

    return descriptions[category] || 'No description available.';
  };

  const getStrongestPreferences = () => {
    let maxScore = 0;
    let strongestCategories: string[] = [];

    for (const category in scores) {
      const data: LearningStyleData = scores[category];
      const score = Math.abs(Number(data.score));

      if (!isNaN(score)) {
        if (score > maxScore) {
          maxScore = score;
          strongestCategories = [category];
        } else if (score === maxScore) {
          strongestCategories.push(category);
        }
      }
    }

    return { strongestCategories, maxScore };
  };

  const { strongestCategories, maxScore } = getStrongestPreferences();

  return (
    <Box mt={4} className={classes.container}>
      <Typography variant="h1" component="h1" gutterBottom className={classes.title}>
        What do my results mean?
      </Typography>
      <Typography variant="body1" paragraph className={classes.paragraph}>
        According to the Index of Learning Styles by Richard M. Felder, there are four dimensions of
        learning styles, each with two opposing categories (e.g., active and reflective).
      </Typography>
      <Typography variant="body1" paragraph className={classes.paragraph}>
        If your score for a learning style dimension is 1 or 3, you have a mild preference for that
        category.
      </Typography>
      <Typography variant="body1" paragraph className={classes.paragraph}>
        If your score for a dimension is 5 or 7, you have a moderate preference for that category.
      </Typography>
      <Typography variant="body1" paragraph className={classes.paragraph}>
        If your score for a dimension is 9 or 11, you have a strong preference for that category.
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom className={classes.subtitle}>
        Your Strongest Learning Preference
      </Typography>
      <Typography variant="body1" paragraph className={classes.paragraph}>
        Based on your responses, your strongest learning preference(s) are:
      </Typography>
      {strongestCategories.length > 0 ? (
        strongestCategories.map((category) => (
          <Typography key={category} variant="body1" paragraph className={classes.paragraph}>
            <strong>{category}</strong> with a score of <strong>{maxScore}</strong>.
            {getDescription(category)}
          </Typography>
        ))
      ) : (
        <Typography variant="body1" paragraph className={classes.paragraph}>
          No strong preference identified.
        </Typography>
      )}
    </Box>
  );
};

export default ResultExplanation;
