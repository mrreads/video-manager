<template>
    
    <div class="sidebar">

        <div class="sidebar__button"> <i class="el-icon-film"></i> </div>

        <div class="sidebar__button disabled"> <i class="el-icon-scissors"></i> </div>

        <div class="sidebar__button setting"> <i class="el-icon-s-tools"></i> </div>
    
    </div>

</template>

<style scoped>
    .sidebar
    {
        flex-grow: 1;
        display: flex;
        align-self: stretch;
        flex-flow: column nowrap;

        width: 75px;
        min-width: 75px;
        max-width: 80px;
        padding-top: 30px;
        padding-bottom: 5px;

        background-color: #303133;
    }

    .sidebar__button
    {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2em;
        padding: 10px 0;
        cursor: pointer;
        height: 60px;
        margin: 5px 0;
        color: white;

        transition: 0.3s background-color;
    }

    .sidebar__button:not(.disabled):hover
    {
        background-color: #505153;
    }

    .sidebar__button.disabled
    {
        cursor: default;
        opacity: 0.3;
    }
    .sidebar__button.setting
    {
        margin-top: auto;
    }
</style>