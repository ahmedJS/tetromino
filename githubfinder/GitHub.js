class GitHub{
    constructor(){
        this.auth = "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 ";
    }

    async getUser(name){
        var response = await fetch(`https://api.github.com/users/${name}`);
        var json_response = await response.json();
        return json_response;
    }
}