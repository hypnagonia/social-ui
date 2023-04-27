import './App.css';
import List from './components/List'
import { useEffect, useState } from 'react'
// import { getStrategies } from './api/api';
import { SearchAutocomplete } from './components/SearchAutocomplete'
import { getWindowParam, setWindowParam} from './utils';
import { useCallback } from 'react'

const isRankingPage = () => window.location.pathname.indexOf('/rankings') !== -1

function App() {
  const [isRanking, setIsRanking] = useState(isRankingPage)

  const onSearchAutocomplete = useCallback((s: string) => {
    window.history.pushState({}, '', '/rankings')
		setWindowParam('page', '1')
		setWindowParam('search', s)
    setIsRanking(true)
	}, [])

  if (isRanking) {
    return (
      <div className="App">
        <SearchAutocomplete 
        setMode={setIsRanking}
        onSearch={onSearchAutocomplete} />
      </div>
    )
  }

  return (
    <div className="App">
      <List />
    </div>
  );
}

export default App;