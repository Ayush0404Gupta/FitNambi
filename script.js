function init (){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}


init()

var cursor = document.querySelector('.cursor')
var main = document.querySelector('.main')
var video = document.querySelector('.video')
main.addEventListener('mousemove', function(dets){
    cursor.style.left = dets.x+20 +"px"
    cursor.style.top = dets.y+20 +"px"
})

// video.addEventListener('mouseenter',function(){
//     cursor.innerHTML = "sound on"
// })


var timeLine1 = gsap.timeline({
    scrollTrigger:{
        trigger:".page1 h1",
        scroller :".main",
        start:"top 30%",
        end:"top 0",
        scrub:2
    }
})

timeLine1.to('.page1 h1',{
    x:-80,
  
},'anim')
timeLine1.to('.page1 h2',{
    x:80,
  
},'anim')
timeLine1.to('.page1 video',{
    width:"90%"
  
},'anim')


var timeLine2 = gsap.timeline({
    scrollTrigger:{
        trigger:".page1 h1",
        scroller :".main",
        start:"top -110%",
        end:"top -120%",
        scrub:2
    }
})

timeLine2.to(".main",{
    backgroundColor:"#fff"
})
timeLine2.to(".page3-part2 h1",{
    color:"#fff"
})


var timeLine3 = gsap.timeline({
    scrollTrigger:{
        trigger:".page1 h1",
        scroller :".main",
        start:"top -300%",
        end:"top -320%",
        scrub:2
    }
})

timeLine3.to('.main',{
    backgroundColor:"#000"
})


var box = document.querySelectorAll('.box')
box.forEach(function(elem){
    elem.addEventListener('mouseenter',function(){
       var att =  elem.getAttribute('data-image')
       cursor.style.width="300px"
       cursor.style.height="270px"
       cursor.style.borderRadius="0px"
       cursor.style.backgroundImage=`url(${att})`
    })
    elem.addEventListener('mouseleave',function(){
       var att =  elem.getAttribute('data-image')
       cursor.style.width="15px"
       cursor.style.height="15px"
       cursor.style.borderRadius="50%"
       cursor.style.backgroundImage=`none`
    })
})