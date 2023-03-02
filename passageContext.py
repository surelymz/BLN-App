import openai
openai.api_key = "YOUR_API_KEY"

def summarize_text(text, max_tokens, subject):
    model_engine = "davinci" # change the model engine if needed

    # first prompt for summarizing the text
    prompt1 = f"Please summarize the following text on {subject}: {text}"
    response1 = openai.Completion.create(
        engine=model_engine,
        prompt=prompt1,
        max_tokens=max_tokens,
        n=1,
        stop=None,
        temperature=0.5,
    )
    summary = response1.choices[0].text.strip()

    # second prompt for providing context and reading suggestions
    prompt2 = f"Please provide the context of the reading passage on {subject}, including any relevant keywords, historical background, author information, and suggest additional readings according to the text: {text}"
    response2 = openai.Completion.create(
        engine=model_engine,
        prompt=prompt2,
        max_tokens=1000, # increase max_tokens for longer responses
        n=1,
        stop=None,
        temperature=0.5,
    )
    context = response2.choices[0].text.strip()

    return summary, context

# example usage
text = "In computer science, artificial intelligence (AI), sometimes called machine intelligence, is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans and animals. Computer science defines AI research as the study of intelligent agents: any device that perceives its environment and takes actions that maximize its chance of successfully achieving its goals. Colloquially, the term \"artificial intelligence\" is often used to describe machines (or computers) that mimic \"cognitive\" functions that humans associate with the human mind, such as learning and problem solving."
max_tokens = 30
subject = "Artificial Intelligence"
summary, context = summarize_text(text, max_tokens, subject)
print("Summary:")
print(summary)
print("Context:")
print(context)
