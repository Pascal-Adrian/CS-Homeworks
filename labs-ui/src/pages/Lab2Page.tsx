import React, {useEffect, useState} from "react";
import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000/lab-2",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
    }
});

const Lab2Page: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [newText, setNewText] = useState<string>("");
    const [frequencies, setFrequencies] = useState<{ [key: string]: number }>({});
    const [englishFrequencies, setEnglishFrequencies] = useState<{ [key: string]: number }>({});
    const [replacements, setReplacements] = useState<{ [key: string]: string }>({});
    const ref = React.useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const fetchEnglishFrequencies = async () => {
            try {
                const response = await instance.get("/english-frequency");
                const sortedFrequencies = sortFrequencies(response.data);
                setEnglishFrequencies(sortedFrequencies);
            } catch (e) {
                console.error(e);
            }
        };
        fetchEnglishFrequencies();
    });

    const convertText = (text: string): string => {
        text = text.toUpperCase();
        text = text.replace(/[\n\r]/g, " ");
        text = text.replace(/"/g, '\\"');
        return text;
    };

    const findFrequencies = async () => {
        try {
            const response = await instance.post("/count-frequency", {text: text});
            const sortedFrequencies = sortFrequencies(response.data);
            setFrequencies(sortedFrequencies);
            setReplacements(resetValues(sortedFrequencies));
        } catch (e) {
            console.error(e);
        }
    };

    const replaceLetters = async () => {
        try {
            const response = await instance.post("/replace-in-text", {
                text: text,
                replacements: replacements
            });
            setNewText(response.data.replace(/\\"/g, '"'));
        } catch (e) {
            console.error(e);
        }
    };

    const handleTextAreaInput = () => {
        const element = ref.current;
        if (element) {
            element.style.height = '5px';
            element.style.height = element.scrollHeight + 'px';
        }
    };

    const sortFrequencies = (frequencies: { [key: string]: number }): { [key: string]: number } => {
        const sortedFrequencies: { [key: string]: number } = {};
        Object.entries(frequencies).sort((a, b) => b[1] - a[1]).forEach(([key, value]) => {
            sortedFrequencies[key] = value;
        });
        return sortedFrequencies;
    };

    const resetValues = (frequencies: { [key: string]: number }): { [key: string]: string } => {
        const replacements: { [key: string]: string } = {};
        Object.entries(frequencies).forEach(([key, value]) => {
            replacements[key] = "";
        });
        return replacements;
    };

    const handleLetterInput = (e: React.ChangeEvent<HTMLInputElement>, letter: string) => {
        if (replacements[letter].length < 1 && /[A-Za-z]/.test(e.target.value)) {
            setReplacements({...replacements, [letter]: e.target.value.toUpperCase()});
        } else if (replacements[letter].length === 1 && e.target.value === "") {
            setReplacements({...replacements, [letter]: e.target.value.toUpperCase()});
        }
    };

    return (
        <main className="flex flex-col p-8">
            <h1 className="text-3xl font-bold text-center mb-4">Laboratory Work No. 2</h1>
            <div className="w-full flex flex-col gap-4">
                <div>
                    <label className="text-xl">Cypher text:</label>
                    <div className="p-4 border border-black rounded-md">
                        <section className="flex flex-col">
                            <textarea
                                className="overflow-hidden mb-3"
                                rows={4}
                                ref={ref}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(convertText(e.target.value))}
                                onInput={handleTextAreaInput}
                            />
                            {text.length > 0 &&
                                <button
                                    className="p-4 w-fit bg-blue-700 text-white rounded-md mt-2"
                                    onClick={findFrequencies}
                                >Find Frequencies
                                </button>
                            }
                        </section>
                    </div>
                </div>
                <section className="flex flex-col gap-4">
                    <div>
                        <label className="text-xl">English language letter frequency:</label>
                        <div className="p-2 border border-black rounded-md">
                            <div className="flex gap-2 w-full">
                                {Object.entries(englishFrequencies).map(([key, value]) => (
                                    <div key={key} className="flex-1 text-center border border-black rounded-sm">
                                        <div className="w-full border-b border-black">{key}</div>
                                        <div>{Math.round(value * 10000) / 100}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {Object.keys(frequencies).length > 0 &&
                        <div>
                            <label className="text-xl">Cypher text letter frequency:</label>
                            <div className="p-2 border border-black rounded-md">
                                <div className="flex gap-2 w-full">
                                    {Object.entries(frequencies).map(([key, value]) => (
                                        <div key={key} className="flex-1 text-center border border-black rounded-sm">
                                            <div className="w-full border-b border-black">{key}</div>
                                            <div
                                                className="w-full border-b border-black">{Math.round(value * 10000) / 100}</div>
                                            <input type="text" className="w-4 text-center" value={replacements[key]}
                                                   onChange={(e) => handleLetterInput(e, key)}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                </section>
                {Object.keys(frequencies).length > 0 &&
                    <section className="flex flex-col">
                        <button
                            className="p-4 w-fit bg-blue-700 text-white rounded-md mt-2 disabled:cursor-not-allowed"
                            onClick={replaceLetters}
                            disabled={!text || !frequencies || !englishFrequencies || !replacements}
                        >
                            Replace Letters
                        </button>
                        <label className="text-xl mt-4">Decyphered text:</label>
                        <p className="p-2 border border-black rounded-md">
                            {newText.split("").map((letter, index) =>
                                letter === letter.toLowerCase() ? <span className="text-blue-700" key={index}>{letter}</span> : letter
                            )}
                        </p>
                    </section>
                }
            </div>
        </main>
    );
};

export default Lab2Page;