import React, { ReactNode, useEffect, useState } from 'react';
import { green_elephant_parts } from '../green_elephant_source';
import { Heron } from './Heron';

const getRandomPart = () => green_elephant_parts[Math.floor(Math.random() * green_elephant_parts.length)];

type PuzzleType = {
    puzzle: React.ReactNode;
    answer: React.ReactNode;
    solver: (str: string) => boolean;
    key: number;
}

const createPuzzle = (part: string = getRandomPart()): PuzzleType => {
    const parts = part.split(" ");
    const random_part_index = Math.floor(Math.random() * parts.length);
    const puzzle_answer = parts[random_part_index].replace(/[,.?!«»…]/g, "");

    if (puzzle_answer.length < 2) {
        return createPuzzle();
    }

    const answer = parts.map((v, i) => i === random_part_index
        ? <><strong>{puzzle_answer}</strong><span>{v.replace(puzzle_answer, "")} </span></>
        : <span>{v} </span>
    );
    const puzzle = parts.map((v, i) => i === random_part_index
        ? <><strong>{"*".repeat(puzzle_answer.length)}</strong><span>{v.replace(puzzle_answer, "")} </span></>
        : <span>{v} </span>
    );

    return {
        puzzle,
        answer,
        solver: (str: string) => str.toUpperCase() === puzzle_answer.toUpperCase(),
        key: Math.random(),
    }
};

const useRandomKey = <T extends any[]>(deps: T) => {
    const [key, setKey] = useState(() => Math.random());

    useEffect(() => {
        setKey(Math.random());
    }, deps);

    return key;
};

export const Puzzle: React.FC = () => {
    const [{ puzzle, answer, solver, key }, setPuzzle] = useState(createPuzzle);
    const [value, setValue] = useState("");
    const [answers, setAnswers] = useState(0);
    const [errors, setErrors] = useState(0);
    const [classic, setClassic] = useState<ReactNode>("");
    const [show_heron, setShowHeron] = useState(false);
    const classic_key = useRandomKey([classic]);

    useEffect(() => {
        if (!classic) {
            return;
        }
        const clear_timeout = setTimeout(() => setClassic(""), 5000);

        return () => clearTimeout(clear_timeout);
    }, [classic]);

    useEffect(() => {
        if (!show_heron) {
            return;
        }
        const clear_timeout = setTimeout(() => setShowHeron(false), 3000);

        return () => clearTimeout(clear_timeout);
    }, [show_heron]);

    const solve = () => {
        if (solver(value)) {
            setAnswers(answers + 1);
            setShowHeron(true);
        } else {
            setErrors(errors + 1);
            setClassic(answer);
        }
        setPuzzle(createPuzzle());
        setValue("");
    }

    return (
        <div className="PuzzleWrapper">
            <div className="score">
                <div className="answers">Правильных ответов: {answers}</div>
                <div className="errors">Ошибок: {errors}</div>
            </div>
            <div className="inputWrapper">
                <input autoFocus={true} value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => e.keyCode === 13 && solve()} />
            </div>
            <div className="puzzle" key={key}>{puzzle}</div>
            {show_heron && <Heron />}
            {classic && <div key={classic_key} className="classic">
                {classic}
            </div>}
        </div>
    );
};

