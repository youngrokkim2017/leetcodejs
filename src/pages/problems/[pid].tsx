import React from 'react';

import Topbar from '@/components/Topbar/Topbar';
import Workspace from '@/components/Workspace/Workspace';
import { problems } from '@/utils/problems';
import { Problem } from '@/utils/types/problem';

type ProblemPageProps = {
    problem: Problem
};

const ProblemPage:React.FC<ProblemPageProps> = ({ problem }) => { 
    return <div>
        <Topbar problemPage={true} />
        <Workspace problem={problem} />
    </div>
}
export default ProblemPage;

// fetch local data, using SSG (SSG static site generation)
// SSG
// function getStaticPaths creates dynamic routes
export async function getStaticPaths() {
    const paths = Object.keys(problems).map((key) => ({
        params: { pid: key }
    }))

    return {
        paths,
        fallback: false
    }
}

// getStaticProps fetches data
export async function getStaticProps({ params }: { params: { pid: string } }) {
	const { pid } = params
	const problem = problems[pid]

	if (!problem) {
		return {
			notFound: true,
		}
	}

	problem.handlerFunction = problem.handlerFunction.toString()

	return {
		props: {
			problem,
		},
	}
}