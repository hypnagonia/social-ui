import { useEffect, useState, useCallback } from 'react'
import {
	getFeedPostsByName,
	getSuggestedPostsByName,
	PER_PAGE,
	Profile
} from '../api/api'

import Pagination from './Pagination'
import { explorerNFTURL, formatPrice, setWindowParam, getWindowParam, tweet } from '../utils'
import { normalizeLinks } from '../api/meta'
import { Search } from './Search'
import { VerifiedIcon } from './VerifiedIcon'
import { Tooltip } from './Tooltip'
import { Post } from './Post'


const isFeed = () => true // window.location.pathname.indexOf('/feed') !== -1

const dateToString = (d: string) => {
	if (!d) {
		return ''
	}

	const date = new Date(d)
	return date.toLocaleString('en-US', { month: '2-digit', year: '2-digit' }).replace(',', '/')
}

export const loader = async (page: number, search: string) => {
	const [results] = await Promise.all([
		isFeed() ? getFeedPostsByName(search) : getSuggestedPostsByName(search),
	])

	const data = {
		results: results || [],
		page,
		count: 1
	}

	return data
}

const getInitialPage = () => {
	return +getWindowParam('page') || 1
}


export default function List(props: any) {

	const [data, setData] = useState({
		results: [] as Profile[],
		page: getInitialPage(),
		count: 0
	})

	const [page, setPage] = useState(getInitialPage())
	const [search, setSearch] = useState(getWindowParam('strategy') || 'latest')

	const filterData = useCallback((s: string) => {
		setWindowParam('strategy', s)
		setSearch(s)
		setPage(1)
	}, [])


	useEffect(() => {
		const run = async () => {
			const d = await loader(page, search)
			setData(d)
		}

		run()
	}, [page, search])


	return (
		<main>
			<header>

				<div className="ranking-a">
					<a href="https://lens.k3l.io" target="_blank">Profile Rankings</a>
				</div>
				<div className="logo-container" style={{ marginTop: 40 }}>
					<a href="https://karma3labs.com/" target="_blank">
						<img
							width="180px"
							className="logo"
							src="/logo.svg"
							draggable="false"
							alt="Karma3Labs Logo"
						/>

					</a>

					<a>
						<img
							width="50px"
							className="logo-lens"
							src="/lens-white.svg"
							draggable="false"
							alt="Lens Logo"
						/>
					</a>
				</div>


				<div className="title">
					<h1>Content Feed</h1>
					<p>
						<small style={{ color: 'white' }}>
							Open and Verifiable Content Feed powered by EigenTrust.
							<a style={{ borderBottom: '1px solid white' }} href="https://karma3labs.notion.site/NFT-Reputation-EigenTrust-Scoring-public-6ec9ec4529854a0cabb6e1cb8fefa8cf#74d0793068df4cc19350d7b84175152c" target="_blank">&nbsp;Learn More.</a>
						</small>
					</p>
				</div>
				{!isFeed() && <>
					<div className="strategies">

					</div>
					<Search onSearch={filterData} initialValue={search} />


					<button className="twitter"
						style={{ marginTop: 30 }}
						onClick={() => tweet('Check out the Open NFT Rankings here:')}
					>
						<i></i>&nbsp;Share
					</button>
				</>}

				<br />

			</header>
			<div className="container">
					<br/>
				<div>
					{['latest', 'engagement-viralPosts', 'ml-xgb-followship'].map(c => {

						const name = c === 'ml-xgb-followship' ? 'EigenTrust+ML' : c
						return <><div 
						onClick={() => filterData(c)}
						className={"strategy-btn" + (search === c ? ' active-strategy-btn' : '')}
						style={{textTransform: 'capitalize', marginRight: 20}}>
							{name}</div></>
					})}
				</div>
				<br/>
				<div className="scroll" style={{ marginTop: 10 }}>
					<div className="profiles-container">
						{data.results.map((e, i) => {
							const isLast = data.results.length === i + 1

							return <div key={e.id} className="post">

								<Post
									key={e.postId}
									isLast={isLast}
									data={e} />

							</div>
						})

						}
						<div>
							{data.results.length === 0 && <div></div>}
						</div>
						<Pagination
							numberOfPages={Math.ceil(data.count / PER_PAGE)}
							currentPage={data.page}
							cb={p => setPage(p)}
						/>
					</div>
				</div>
			</div>
		</main >
	)
}

export function ErrorBoundary({ error }: { error: Error }) {
	return (
		<main>
			<div className="container">
				<h1>Error</h1>
				<p>{error.message}</p>
				<p>The stack trace is:</p>
				<pre>{error.stack}</pre>
			</div>
		</main>
	)
}
