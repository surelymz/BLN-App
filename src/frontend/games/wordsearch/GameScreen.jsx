export default function GameScreen() {
    const [words, setWords] = useState([]);
    const [board, setBoard] = useState([]);
    const [selectedCells, setSelectedCells] = useState([]);
    const [completedWords, setCompletedWords] = useState([]);
  
    useEffect(() => {
      const newWords = generateWords(); // replace this with your own word generation logic
      const newBoard = generateBoard(newWords); // replace this with your own board generation logic
      setWords(newWords);
      setBoard(newBoard);
    }, []);
  
    const handleCellPress = (row, col) => {
      const cell = { row, col };
      setSelectedCells([...selectedCells, cell]);
      const word = getSelectedWord(selectedCells, board);
      if (word && !completedWords.includes(word)) {
        setCompletedWords([...completedWords, word]);
      }
    };
  
    return (
      <View style={styles.container}>
        <Board board={board} selectedCells={selectedCells} onPress={handleCellPress} />
        <WordList words={words} completedWords={completedWords} />
      </View>
    );
  }
  
