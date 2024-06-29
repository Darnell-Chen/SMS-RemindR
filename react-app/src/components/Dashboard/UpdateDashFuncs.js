const addCard = (currState, newMessage) => {
    return {
        ...currState,
        Messgaes: currState.Messages.push(newMessage),
        messageCount: (currState.messageCount + 1)
    }
}

const removeCard = (currState, title) => {
    return {
        ...currState,
        Messages: currState.Messages.filter(message => message.title !== title),
        messageCount: (currState.messageCount - 1)
    }
}

export {addCard, removeCard};