<template>
    <!-- 轮播图 -->
    <div id="carousel">
        <ul class="photo">
            <li
                class="photo-item"
                v-show="activeIndex === i"
                v-for="(item, i) in photoList"
                :key="i"
            >
                <div class="left-arrow-click" @click="back()"></div>
                <img :src="item.url" />
                <div class="right-arrow-click" @click="next()"></div>
            </li>
        </ul>
        <ul class="point">
            <li
                class="point-item"
                :class="activeIndex === i ? 'now-point' : ''"
                v-for="(item, i) in pointNum"
                :key="i"
                @click="changePhoto(i)"
            ></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Carousel",
    data() {
        return {
            sideBarShowFlag: false,
            activeIndex: 0,
            pointNum: 3,
            photoList: [
                {
                    id: 1,
                    url: "/images/UI/P1.jpg",
                },
                {
                    id: 2,
                    url: "/images/UI/P2.jpg",
                },
                {
                    id: 3,
                    url: "/images/UI/P3.jpg",
                },
            ],
            timer: "",
        };
    },
    mounted() {
        this.run();
    },
    methods: {
        run() {
            this.timer = setInterval(() => {
                // this.activeIndex++;
                if (++this.activeIndex > 2) this.activeIndex = 0;
            }, 1500);
        },
        changePhoto(i) {
            clearInterval(this.timer);
            this.activeIndex = i;
            this.run();
        },
        back() {
            clearInterval(this.timer);
            if (--this.activeIndex < 0) this.activeIndex = 2;
            this.run();
        },
        next() {
            clearInterval(this.timer);
            if (++this.activeIndex > 2) this.activeIndex = 0;
            this.run();
        },
    },
};
</script>

<style lang="scss" scoped>
$bgcolor1: rgb(124, 190, 85);
$bgcolor2: rgb(85, 178, 190);
$bgcolor3: rgb(177, 77, 19);
#carousel {
    width: 700px;
    height: 300px;
    padding: 30px;
    position: absolute;
    left: 50px;
    top: 50px;
    background-color: rgba(56, 118, 121, 0.479);
    img {
        background-size: 100%;
        width: 460px;
        height: 200px;
    }
    li {
        list-style: none;
        width: 460px;
        height: 200px;
    }
    .photo {
        width: 540px;
        margin: auto;
        margin-bottom: 20px;
    }
    li.photo-item {
        background-color: $bgcolor1;
        position: relative;
    }
    .point {
        width: 140px;
        margin: auto;
        z-index: 99;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    li.point-item {
        width: 10px;
        height: 10px;
        background-color: blue;
        border-radius: 50%;
    }
    li.point-item:hover,
    .left-arrow-click:hover,
    .right-arrow-click:hover {
        cursor: pointer;
    }
    li.now-point {
        background-color: brown;
    }
    .left-arrow-click {
        width: 20px;
        height: 40px;
        background-color: rgba(95, 158, 160, 0.616);
        position: absolute;
        left: 0;
        top: 43%;
    }
    .right-arrow-click {
        width: 20px;
        height: 40px;
        background-color: rgba(95, 158, 160, 0.658);
        position: absolute;
        right: 0;
        top: 43%;
    }

    /* animation:mymove 2s ; */
}
/* @keyframes mymove
        {
        from {right:-200px;}
        to {right:0px;}
    }

   @-webkit-keyframes mymove
        {
        from {right:0px;}
        to {right:10px;}
    } */

/* .bar-enter-active, .bar-leave-active {
    transition: opacity 2s
    }
    .bar-enter, .bar-leave-to {
    opacity: 0
    } */
/* .el-icon-picture-outline-round {
     background-color: #d40c0c;
     position: absolute;
     right: 200px;
     bottom: 450px;
     font-size: 80px;
     transform: translate(0,0);
    transition: all 2s ease ;
  } */
.my-side-icon {
    position: absolute;
    right: 0px;
    bottom: 220px;
    font-size: 40px;
    background-color: rgba(127, 255, 212, 0.699);
    transform: translate(0, 0);
    transition: transform 1s ease;
}
.el-icon-help {
    /* background-color: #0ed450; */
}
</style>
