const { execSync  } = require('child_process');

//this.$store.getters.getVideoPath,
//this.$store.getters.getVideoLoaded,

export default {
    computed: {
        getVideoInfo: function () 
        {
            if (this.$store.getters.getVideoLoaded)
            {
                let command = `ffprobe -v quiet -print_format json -show_format -show_streams "${this.$store.getters.getVideoPath}"`;
                
                let data = JSON.parse(execSync(command));
                
                console.log(data);
                return data;
            }
            else
            {
                this.VM_videoInfo = null
            }
        }
    }
}