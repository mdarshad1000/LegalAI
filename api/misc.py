from langchain.llms import OpenAI
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationSummaryBufferMemory



conversation_with_summary = ConversationChain(
    llm=OpenAI(), 
    # We set a very low max_token_limit for the purposes of testing.
    memory=ConversationSummaryBufferMemory(llm=OpenAI(), max_token_limit=40),
    verbose=True
)

conversation_with_summary.predict(input="How old is he?")





