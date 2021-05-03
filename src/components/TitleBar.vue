<template>
    <div class="titlebar">
        <div id="title__minimize" class="titlebar__button"> <i class="el-icon-bottom-left"></i> </div>
        <div id="title__resize" class="titlebar__button"> <i class="el-icon-full-screen"></i> </div>
        <div id="title__close" class="titlebar__button"> <i class="el-icon-close"></i> </div>
    </div>
</template>

<style scoped>
    .titlebar
    {
        display: flex;
        align-content: center;
        flex-flow: row nowrap;
        justify-content: flex-end;

        max-height: 35px;
        border-bottom: 1px solid  rgba(0,0,0,0.1);
    }

    .titlebar__button
    {
        opacity: 0.6;
        font-size: 1.2em;

        display: flex;
        align-items: center;
        justify-content: center;

        min-width: 35px;
        min-height: 35px;
        margin-left: 5px;

        cursor: pointer;
        transition: 0.3s background-color, 0.3s opacity;
    }

    .titlebar__button:hover
    {
        opacity: 1;
        background-color: #e5e5e5
    }

    #title__close:hover
    {   
        transition: 0.6s;
        color: #FFFFFF;
        background-color: #FD0007;
    }
</style>