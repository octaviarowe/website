
// All credit for this code goes to Yokiie, owner of https://nukochannel.neocities.org
-->
function ghostCursor(options) {
  let hasWrapperEl = options && options.element
  let element = hasWrapperEl || document.body

  let width = window.innerWidth
  let height = window.innerHeight
  let cursor = { x: width / 2, y: width / 2 }
  let particles = []
  let canvas, context

  let baseImage = new Image()
  baseImage.src = "data:image/png;base64, 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"
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEwAAAAAChpcNAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAABqElEQVQoFY3SPUvDQBgH8BREpRHExYiDgmLFl6WC+AYmWeyLg4i7buJX8DMpOujgyxGvUYeCgzhUQUSKKLUS0+ZyptXh8Z5Ti621ekPyJHl+uftfomhaf9Ei5JyxXKfynyEA6EYcLHpwyflT958GAQ7DTABNHd8EbtDbEH2BD5QEQmi2mM8P/Iq+A0SzszEg+3sPjDnDdVEtQKQbMUidHD3xVzf6A9UDEmEm+8h9KTqTVUjT+vB53aHrCbAPiceYq1dQI1Aqv4EhMll0jzv+Y0yiRgCnLRSYyDQHVoqUXe4uKL9l+L7GXC4vkMhE6eW/AOJs9k583ORDUyXMZ8F5SVHVVnllmPNKSFagAJ5DofaqGXw/gHBYg51dIldkmknY3tguv3jOtHR4+MqAzaraJXbEhqHhcQlwGSOi5pytVQHZLN5s0WNe8HPrLYlFsO20RPHkImxsbmHdLJFI76th7Z4SeuF53hTeFLvhRCJRCTKZKxgdnRDbW+iozFJbBMw14/ElwGYc0egMBMFzT21f5Rog33Z7dX02GBm7WV5ZfT5Nn5bE3zuCDe9UxdTpNvK+5AAAAABJRU5ErkJggg=="

  function init() {
    canvas = document.createElement("canvas")
    context = canvas.getContext("2d")
    canvas.style.top = "0px"
    canvas.style.left = "0px"
    canvas.style.pointerEvents = "none"

    if (hasWrapperEl) {
      canvas.style.position = "absolute"
      element.appendChild(canvas)
      canvas.width = element.clientWidth
      canvas.height = element.clientHeight
    } else {
      canvas.style.position = "fixed"
      document.body.appendChild(canvas)
      canvas.width = width
      canvas.height = height
    }

    bindEvents()
    loop()
  }

  // Bind events that are needed
  function bindEvents() {
    element.addEventListener("mousemove", onMouseMove)
    element.addEventListener("touchmove", onTouchMove)
    element.addEventListener("touchstart", onTouchMove)
    window.addEventListener("resize", onWindowResize)
  }

  function onWindowResize(e) {
    width = window.innerWidth
    height = window.innerHeight

    if (hasWrapperEl) {
      canvas.width = element.clientWidth
      canvas.height = element.clientHeight
    } else {
      canvas.width = width
      canvas.height = height
    }
  }

  function onTouchMove(e) {
    if (e.touches.length > 0) {
      for (let i = 0; i < e.touches.length; i++) {
        addParticle(e.touches[i].clientX, e.touches[i].clientY, baseImage)
      }
    }
  }

  function onMouseMove(e) {
    if (hasWrapperEl) {
      const boundingRect = element.getBoundingClientRect()
      cursor.x = e.clientX - boundingRect.left
      cursor.y = e.clientY - boundingRect.top
    } else {
      cursor.x = e.clientX
      cursor.y = e.clientY
    }

    addParticle(cursor.x, cursor.y, baseImage)
  }

  function addParticle(x, y, image) {
    particles.push(new Particle(x, y, image))
  }

  function updateParticles() {
    context.clearRect(0, 0, width, height)

    // Update
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(context)
    }

    // Remove dead particles
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].lifeSpan < 0) {
        particles.splice(i, 1)
      }
    }
  }

  function loop() {
    updateParticles()
    requestAnimationFrame(loop)
  }

  /**
   * Particles
   */

  function Particle(x, y, image) {
    const lifeSpan = 40
    this.initialLifeSpan = lifeSpan //ms
    this.lifeSpan = lifeSpan //ms
    this.position = { x: x, y: y }

    this.image = image

    this.update = function(context) {
      this.lifeSpan--
      const opacity = Math.max(this.lifeSpan / this.initialLifeSpan, 0)

      context.globalAlpha = opacity
      context.drawImage(
        this.image,
        this.position.x, // - (this.canv.width / 2) * scale,
        this.position.y //- this.canv.height / 2,
      )
    }
  }

  init()
}
