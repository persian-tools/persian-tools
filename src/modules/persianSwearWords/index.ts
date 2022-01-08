import data from './data.json'

/**
 * detect and filter persian swear words
 * 
 * @class
 * @namespace persianSwear
 * 
 */
class persianSwear {

    /**
     * @private
     * @type        {String}
     * @description list of mostly repeated swear words in persian language
     */
    private badWords: string[]


    // ======================
    constructor() {
        this.badWords = [...data.words];
    }


    /**
     * Check the Word is a persian Swear word
     *
     * @memberof  persianSwear
     * @param     {String} word - the word for check
     * @return    {boolean} Return true if the word contain in the swear words list
     */
    isBad(word: string): boolean {
        const found = this.badWords.find(w => w === word)
        if (found === undefined)
            return false
        return true
    }


    /**
     * Add new Word to swear words list if you think your word not to be in list
     *
     * @memberof  persianSwear
     * @param     {String} word - the word for add to swear list
     */
    addWord(word: string): void {
        const found = this.badWords.find(w => w === word)
        if (found === undefined)
            this.badWords.push(word)
    }


    /**
     * Remove the word if you don't wanna filter on a Swear word
     *
     * @memberof  persianSwear
     * @param     {String} word - the word for remove from swear list
     */
    removeWord(word: string): void {
        this.badWords = this.badWords.filter(e => e !== word)
    }


    /**
     * Check the text contain swear word
     *
     * @memberof  persianSwear
     * @param     {String} text - the word for check
     * @return    {boolean} Return true if text contain a swear word
     */
    isContain(text: string): boolean {
        for (let index = 0; index < this.badWords.length; index++)
            if (text.includes(this.badWords[index]))
                return true
        return false
    }


    /**
     * filter every swear words from text
     *
     * @memberof  persianSwear
     * @param     {String} text - the text for filter swear words
     * @param     {String} prefix? - the symbol you wanna replace with swear word
     * @return    {boolean} filtered text from swear words
     */
    filterSwear(text: string, prefix: string = "***"): string {
        let text_result: string = ""
        let text_splited: string[] = text.split(" ")
        for (let i = 0; i < text_splited.length; i++) {
            if (this.isBad(text_splited[i]))
                text_result += prefix
            else
                text_result += text_splited[i]
            text_result += " "
        }

        return text_result
    }

}


export default persianSwear
