import { useState, useEffect } from 'react';
import { OpenAI } from 'openai';
// @ts-ignore
import StartScreen from './components/StartScreen.jsx' 
// @ts-ignore
import Spinner from './components/spinner.jsx'

// Load your API key from environment variables or directly (not recommended for production)


const JeopardyGame = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [currentTeam, setCurrentTeam] = useState(1);
  const [teamScores, setTeamScores] = useState({ team1: 0, team2: 0 });
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [categories, setCategories] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('null');

  const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: apiKey, // or replace with your key directly: 'sk-...'
  });

  const [formData, setFormData] = useState({
    cat1: '',
    cat2: '',
    cat3: '',
    cat4: '',
    cat5: '',
  });

  const handleReset = () => {
    setFormData({
      cat1: '',
      cat2: '',
      cat3: '',
      cat4: '',
      cat5: '',
    });
  };

  const handleSubmit = () => {
    console.log('Current form data:', formData);
    generateCategories();
  };

  async function generateCategories() {
    const userPrompt = `
      Generate 5 trivia game categories, each with 5 questions of increasing difficulty (100, 200, 300, 400, 500 points).
      For each category:
      - Give it a short, clear title - use the following categories ${formData.cat1.toUpperCase()}, ${formData.cat2.toUpperCase()}, ${formData.cat3.toUpperCase()}, ${formData.cat4.toUpperCase()}, ${formData.cat5.toUpperCase()}
      - Provide 5 multiple-choice questions with 4 options each.
      - Label the correct answer using an index (e.g., correctAnswer: 2).
      - Keep the questions and answers fact-based, not opinion-based.
      - Format the output as a JSON array called "categories", where each category contains a "name" and "questions".
      - escape any ' marks or anythhing tht can mess up a json parse
      exampke format -
      name: "SCIENCE",
      questions: [
        { 
          points: 100, 
          question: "This planet is known as the Red Planet", 
          options: ["Mars", "Venus", "Jupiter", "Saturn"],
          correctAnswer: 0
        },
        { 
          points: 200, 
          question: "The chemical symbol for gold", 
          options: ["Go", "Gd", "Au", "Ag"],
          correctAnswer: 2
        },
        { 
          points: 300, 
          question: "The process by which plants make food using sunlight", 
          options: ["Respiration", "Photosynthesis", "Fermentation", "Digestion"],
          correctAnswer: 1
        },
        { 
          points: 400, 
          question: "The hardest natural substance on Earth", 
          options: ["Steel", "Diamond", "Quartz", "Granite"],
          correctAnswer: 1
        },
        { 
          points: 500, 
          question: "Einstein's famous equation relating mass and energy", 
          options: ["E=mc²", "F=ma", "v=d/t", "a=v/t"],
          correctAnswer: 0
        }
      ]
    },
    `;
    setLoading(true);
  
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: 0.7,
    });
  
    const content = response.choices[0].message.content;
  
    // Try to parse the JSON if it looks like a valid JSON string
    try {
      // console.log(content);
      // const jsonStart = content?.indexOf('[');
      if (content) {
        const json = JSON.parse(content);
        // console.log(json);
        // console.log('Generated Categories:', JSON.stringify(json, null, 2));
        setCategories(json.categories);
        console.log(json.categories);
        setLoading(false);
        // console.log(json);
      } else {
        // console.log('Raw Output:\n', content);
      }
    } catch (err) {
    
      // console.error('Failed to parse JSON:', err);
      // console.log('Raw Output:\n', content);
    }
  }

  const styles = {
    container: {
      minHeight: '50vh',
      backgroundColor: '#111827',
      color: 'white',
      padding: '16px',
      fontFamily: 'Arial, sans-serif'
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#FCD34D',
      marginBottom: '24px',
      textAlign: 'center',
      fontFamily: 'serif'
    },
    teamContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '24px'
    },
    teamCard: {
      padding: '16px',
      borderRadius: '8px',
      border: '2px solid',
      textAlign: 'center'
    },
    activeTeam: {
      backgroundColor: '#1E3A8A',
      borderColor: '#60A5FA',
      boxShadow: '0 0 20px rgba(96, 165, 250, 0.5)'
    },
    inactiveTeam: {
      backgroundColor: '#374151',
      borderColor: '#6B7280'
    },
    teamTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    teamScore: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#10B981'
    },
    currentTurn: {
      color: '#93C5FD',
      fontWeight: '600',
      marginTop: '8px'
    },
    controls: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      marginBottom: '32px'
    },
    button: {
      padding: '8px 16px',
      borderRadius: '4px',
      fontWeight: 'bold',
      border: '1px solid',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    switchButton: {
      backgroundColor: '#374151',
      borderColor: '#6B7280',
      color: 'white'
    },
    resetButton: {
      backgroundColor: '#B91C1C',
      borderColor: '#DC2626',
      color: 'white'
    },
    gameBoard: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '8px',
      marginBottom: '32px'
    },
    categoryHeader: {
      backgroundColor: '#374151',
      padding: '16px',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '18px',
      border: '2px solid #FCD34D'
    },
    questionButton: {
      padding: '24px',
      fontSize: '24px',
      fontWeight: 'bold',
      border: '2px solid #FCD34D',
      minHeight: '80px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    activeQuestion: {
      backgroundColor: '#374151',
      color: '#FCD34D'
    },
    answeredQuestion: {
      backgroundColor: '#4B5563',
      color: '#9CA3AF',
      cursor: 'not-allowed'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: '#374151',
      padding: '32px',
      borderRadius: '8px',
      maxWidth: '768px',
      width: '90%',
      border: '4px solid #FCD34D',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    modalHeader: {
      textAlign: 'center',
      marginBottom: '24px'
    },
    teamIndicator: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    points: {
      color: '#FCD34D',
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    question: {
      fontSize: '24px',
      marginBottom: '24px',
      color: '#F3F4F6'
    },
    optionsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '24px'
    },
    option: {
      backgroundColor: '#4B5563',
      padding: '16px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '18px',
      border: '2px solid #6B7280',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.2s'
    },
    closeButton: {
      textAlign: 'center'
    },
    closeLink: {
      color: '#9CA3AF',
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  } as const;
  

  const handleQuestionClick = (categoryIndex: any, questionIndex: any) => {
    const questionId = `${categoryIndex}-${questionIndex}`;
    if (answeredQuestions.has(questionId)) return;
    
    if(categories) {
      setSelectedQuestion({
        ...categories[categoryIndex].questions[questionIndex],
        categoryIndex,
        questionIndex,
        id: questionId
      });
    }
  
  };

  useEffect(() => {
    console.log('categories updated: ', categories)
  }, [categories])

  const [currentAttempts, setCurrentAttempts] = useState(1);

  const handleAnswer = (selectedOption: any) => {
    if (selectedQuestion) {
      const isCorrect = selectedOption === selectedQuestion.correctAnswer;
      
      if(isCorrect) {
        const points = isCorrect ? selectedQuestion.points : -selectedQuestion.points;
        const teamKey = `team${currentTeam}`;
        setTeamScores(prev => ({
          ...prev,
          [teamKey]: prev[teamKey as 'team1' | 'team2'] + points
        }));
        setAnsweredQuestions(prev => new Set([...prev, selectedQuestion.id]));

      }
      
      // Switch teams if incorrect, stay same team if correct
      if (!isCorrect) {
        setCurrentAttempts(prev => prev + 1);
        setCurrentTeam(currentTeam === 1 ? 2 : 1);
        if(currentAttempts === 2) setAnsweredQuestions(prev => new Set([...prev, selectedQuestion.id]));
      }
      
      setSelectedQuestion(null);
    }
  };

  const switchTeam = () => {
    setCurrentTeam(currentTeam === 1 ? 2 : 1);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
  };

  const resetGame = () => {
    handleReset();
    setCategories(null);
    setTeamScores({ team1: 0, team2: 0 });
    setAnsweredQuestions(new Set());
    setSelectedQuestion(null);
    setCurrentTeam(1);
  };

  useEffect(() => {
    console.log("API KEY IN USEFFECT", apiKey)
  }, [apiKey])

  return (
    <div style={styles.container}>
      {
        categories ?
      <div style={{ margin: '0 auto' }}>
        {/* Header */}
        <div>
          <h1 style={styles.title}>JEOPARDY!</h1>
          
          
          {/* Team Scores */}
          <div style={styles.teamContainer}>
            <div style={{
              ...styles.teamCard,
              ...(currentTeam === 1 ? styles.activeTeam : styles.inactiveTeam)
            }}>
              <h2 style={styles.teamTitle}>Team 1</h2>
              <div style={styles.teamScore}>${teamScores.team1}</div>
              {currentTeam === 1 && (
                <div style={styles.currentTurn}>Current Turn</div>
              )}
            </div>
            <div style={{
              ...styles.teamCard,
              ...(currentTeam === 2 ? 
                { ...styles.activeTeam, backgroundColor: '#581C87', borderColor: '#A855F7', boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' } 
                : styles.inactiveTeam)
            }}>
              <h2 style={styles.teamTitle}>Team 2</h2>
              <div style={styles.teamScore}>${teamScores.team2}</div>
              {currentTeam === 2 && (
                <div style={{ ...styles.currentTurn, color: '#C084FC' }}>Current Turn</div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div style={styles.controls}>
            <button 
              onClick={switchTeam}
              style={{ ...styles.button, ...styles.switchButton }}
              onMouseOver={e => (e.target as HTMLElement).style.backgroundColor = '#4B5563'}
              onMouseOut={e => (e.target as HTMLElement).style.backgroundColor = '#374151'}
            >
              Switch Team
            </button>
            <button 
              onClick={resetGame}
              style={{ ...styles.button, ...styles.resetButton }}
              onMouseOver={e => (e.target as HTMLElement).style.backgroundColor = '#DC2626'}
              onMouseOut={e => (e.target as HTMLElement).style.backgroundColor = '#B91C1C'}
            >
              New Game
            </button>
          </div>
        </div>

        {/* Game Board */}
        {
          categories &&
        <div style={styles.gameBoard}>
          {categories.map((category: any, categoryIndex: any) => (
            <div key={categoryIndex}>
              {/* Category Header */}
              <div style={styles.categoryHeader}>
                {category.name}
              </div>
              
              {/* Questions */}
              {category.questions.map((question: any, questionIndex: any) => {
                const questionId = `${categoryIndex}-${questionIndex}`;
                const isAnswered = answeredQuestions.has(questionId);
                
                return (
                  <button
                    key={questionIndex}
                    onClick={() => handleQuestionClick(categoryIndex, questionIndex)}
                    disabled={isAnswered}
                    style={{
                      ...styles.questionButton,
                      ...(isAnswered ? styles.answeredQuestion : styles.activeQuestion)
                    }}
                    onMouseOver={e => {
                      if (!isAnswered) {
                        (e.target as HTMLElement).style.backgroundColor = '#4B5563';
                        (e.target as HTMLElement).style.boxShadow = '0 0 15px rgba(252, 211, 77, 0.3)';
                      }
                    }}
                    onMouseOut={e => {
                      if (!isAnswered) {
                        (e.target as HTMLElement).style.backgroundColor = '#374151';
                        (e.target as HTMLElement).style.boxShadow = 'none';
                      }
                    }}
                  >
                    {isAnswered ? '' : `$${question.points}`}
                  </button>
                );
              })}
            </div>
          ))}
        </div> 
        }

        {/* Question Modal */}
        {selectedQuestion && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>
                <div style={{
                  ...styles.teamIndicator,
                  color: currentTeam === 1 ? '#60A5FA' : '#A855F7'
                }}>
                  Team {currentTeam}'s Turn
                </div>
                <div style={styles.points}>
                  ${selectedQuestion.points}
                </div>
                <div style={styles.question}>
                  {selectedQuestion.question}
                </div>
              </div>
              
              <div style={styles.optionsGrid}>
                {selectedQuestion.options.map((option: any, index: any) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    style={styles.option}
                    onMouseOver={e => {
                      (e.target as HTMLElement).style.backgroundColor = '#6B7280';
                      (e.target as HTMLElement).style.borderColor = '#FCD34D';
                    }}
                    onMouseOut={e => {
                      (e.target as HTMLElement).style.backgroundColor = '#4B5563';
                      (e.target as HTMLElement).style.borderColor = '#6B7280';
                    }}
                  >
                    <span style={{ color: '#FCD34D', marginRight: '8px' }}>
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                ))}
              </div>
              
              <div style={styles.closeButton}>
                <button
                  onClick={closeModal}
                  style={styles.closeLink}
                  onMouseOver={e => (e.target as HTMLElement).style.color = '#D1D5DB'}
                  onMouseOut={e => (e.target as HTMLElement).style.color = '#9CA3AF'}
                >
                  Close without answering
                </button>
              </div>
            </div>
          </div>
        )}
      </div> :
      (loading ? <Spinner /> : <StartScreen data={formData} setData={setFormData} submit={handleSubmit} setApiKey={setApiKey} />)
      }
    </div>
  );
};

export default JeopardyGame;