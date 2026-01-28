// controllers/aiController.js
import OpenAI from 'openai';

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const suggestTaskController = async (req, res) => {
    const { recentTasks } = req.body;

  /*   try {
        const prompt = `Suggest 3 new development tasks based on these completed tasks:\n${recentTasks.join('\n')}`;
        
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }]
        });

        const suggestions = response.choices[0].message.content;
        res.json({ suggestions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "AI suggestion failed" });
    } */
};
