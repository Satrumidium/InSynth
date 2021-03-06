describe('Check Link', () => {
  it('Valid Test: Link to Synth Page', () => {
    cy.visit('/');
    cy.get('a[href*="synth"]').click();
    cy.url().should('include', '/synth');
  });
});

// Lower if testing run time is important, increase to test how the effect sounds
const pianoDelay = 50;

// pianoKeys: 'iop' used to test effects
// pianoKeys: 'asdfghjk' used to test piano

const pianoKeys = 'asdfghjk';
// const pianoKeys = 'iop';

describe('Use Keyboard as Piano', () => {
  it('Valid Test: Press Keys to Play Piano: \'asdfghjk\'', () => {
    cy.get('body').type(pianoKeys, { delay: pianoDelay });
  });
});

describe('Effect Panel: Test and Play Each Effect', () => {
  it('Valid Test: Play Volume Effect', () => {
    cy.get('div[id=volume]').within(() => {
      cy.get('[role="slider"]').eq(0).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
    });
    cy.get('body').type(pianoKeys, { delay: pianoDelay });
  });
  it('Valid Test: Play AutoWah Effect', () => {
    cy.get('div[id=autowah]').within(() => {
      cy.get('input').eq(0).click({ force: true });
      cy.get('[role="slider"]').eq(0).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(1).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(2).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
    });
    cy.get('body').type(pianoKeys, { delay: pianoDelay });
    cy.get('div[id=autowah]').within(() => {
      cy.get('input').eq(0).click({ force: true });
    });
  });
  it('Valid Test: Play BitCrusher Effect', () => {
    cy.get('div[id=bitcrusher]').within(() => {
      // Enable bitcrusher
      cy.get('input').eq(0).click({ force: true });
      // Move slider 1 using arrow keys
      cy.get('[role="slider"]').eq(0).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
    });
    cy.get('body').type(pianoKeys, { delay: pianoDelay });
    // Disable bitcrusher
    cy.get('div[id=bitcrusher]').within(() => {
      cy.get('input').eq(0).click({ force: true });
    });
  });
  it('Valid Test: Play AutoWah Effect', () => {
    cy.get('div[id=chebyshev]').within(() => {
      cy.get('input').eq(0).click({ force: true });
      cy.get('[role="slider"]').eq(0).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(1).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
    });
    cy.get('body').type(pianoKeys, { delay: pianoDelay });
    cy.get('div[id=chebyshev]').within(() => {
      cy.get('input').eq(0).click({ force: true });
    });
  });
  it('Valid Test: Play Chorus Effect', () => {
    cy.get('div[id=chorus]').within(() => {
      cy.get('input').eq(0).click({ force: true });
      cy.get('[role="slider"]').eq(0).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(1).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(2).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(3).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(4).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
    });
    cy.get('body').eq(0).type(pianoKeys, { delay: pianoDelay });

    cy.get('div[id=chorus]').within(() => {
      cy.get('input').eq(0).click({ force: true });
    });
  });

  it('Valid Test: Play Distortion Effect', () => {
    cy.get('div[id=distortion]').within(() => {
      cy.get('input').eq(0).click({ force: true });
      cy.get('[role="slider"]').eq(0).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(1).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
    });
    cy.get('body').eq(0).type(pianoKeys, { delay: pianoDelay });

    cy.get('div[id=distortion]').within(() => {
      cy.get('input').eq(0).click({ force: true });
    });
  });

  it('Valid Test: Play Reverb Effect', () => {
    cy.get('div[id=reverb]').within(() => {
      cy.get('input').eq(0).click({ force: true });
      cy.get('[role="slider"]').eq(0).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
    });
    cy.get('body').eq(0).type(pianoKeys, { delay: pianoDelay });

    cy.get('div[id=reverb]').within(() => {
      cy.get('input').eq(0).click({ force: true });
    });
  });

  it('Valid Test: Play Phaser Effect', () => {
    cy.get('div[id=phaser]').within(() => {
      cy.get('input').eq(0).click({ force: true });
      cy.get('[role="slider"]').eq(0).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(1).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(2).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
    });
    cy.get('body').eq(0).type(pianoKeys, { delay: pianoDelay });

    cy.get('div[id=phaser]').within(() => {
      cy.get('input').eq(0).click({ force: true });
    });
  });
  it('Valid Test: Play Ping Pong Delay Effect', () => {
    cy.get('div[id=pingpongdelay]').within(() => {
      cy.get('input').eq(0).click({ force: true });
      cy.get('[role="slider"]').eq(0).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(1).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
    });
    cy.get('body').type(pianoKeys, { delay: pianoDelay });
    cy.get('div[id=pingpongdelay]').within(() => {
      cy.get('input').eq(0).click({ force: true });
    });
  });
  it('Valid Test: Play Tremolo Effect', () => {
    cy.get('div[id=tremolo]').within(() => {
      cy.get('input').eq(0).click({ force: true });
      cy.get('[role="slider"]').eq(0).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(1).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
    });
    cy.get('body').type(pianoKeys, { delay: pianoDelay });
    cy.get('div[id=tremolo]').within(() => {
      cy.get('input').eq(0).click({ force: true });
    });
  });
  it('Valid Test: Play Vibrato Effect', () => {
    cy.get('div[id=vibrato]').within(() => {
      cy.get('input').eq(0).click({ force: true });
      cy.get('[role="slider"]').eq(0).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(1).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
    });
    cy.get('body').type(pianoKeys, { delay: pianoDelay });
    cy.get('div[id=vibrato]').within(() => {
      cy.get('input').eq(0).click({ force: true });
    });
  });
  it('Valid Test: Play Panner3D Effect', () => {
    cy.get('div[id=panner3d]').within(() => {
      cy.get('input').eq(0).click({ force: true });
      cy.get('[role="slider"]').eq(0).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(1).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
      cy.get('[role="slider"]').eq(2).click().type('{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}{rightArrow}', { force: true });
    });
    cy.get('body').type(pianoKeys, { delay: pianoDelay });
    cy.get('div[id=panner3d]').within(() => {
      cy.get('input').eq(0).click({ force: true });
    });
  });
});

describe('Select Synth', () => {
  it('Invalid Test: Select Already Selected AMSynth', () => {
    cy.get('div[id=synthselector]').within(() => {
      cy.get('button').eq(0).click({ force: true });
      cy.get('button').eq(0).should('have.attr', 'data-active');
      cy.get('button').eq(1).should('not.have.attr', 'data-active');
    });
  });
  it('Valid Test: Select FMSynth', () => {
    cy.get('div[id=synthselector]').within(() => {
      cy.get('button').eq(1).click({ force: true });
      cy.get('button').eq(1).should('have.attr', 'data-active');
    });
  });
  it('Valid Test: Select AMSynth', () => {
    cy.get('div[id=synthselector]').within(() => {
      cy.get('button').eq(0).click({ force: true });
      cy.get('button').eq(0).should('have.attr', 'data-active');
    });
  });
  it('Invalid Test: Select Already Selected FMSynth', () => {
    cy.get('div[id=synthselector]').within(() => {
      cy.get('button').eq(1).click({ force: true });
      cy.get('button').eq(1).should('have.attr', 'data-active');
      cy.get('button').eq(0).should('not.have.attr', 'data-active');
    });
  });
});

describe('ADSR Envelope Panel', () => {
  it('Valid Test: Change Attack', () => {
    cy.get('div[id=ADSREnvelope]').within(() => {
      cy.get('input').eq(0).click({ force: true });
      cy.get('[role="slider"]').eq(0).click().type('{downArrow}', { force: true });
      cy.get('[id="attackval"]').should('have.html', '99');
    });
  });
  it('Valid Test: Change Decay', () => {
    cy.get('div[id=ADSREnvelope]').within(() => {
      cy.get('input').eq(1).click({ force: true });
      cy.get('[role="slider"]').eq(1).click().type('{downArrow}', { force: true });
      cy.get('[id="decayval"]').should('have.html', '99');
    });
  });
  it('Valid Test: Change Sustain', () => {
    cy.get('div[id=ADSREnvelope]').within(() => {
      cy.get('input').eq(2).click({ force: true });
      cy.get('[role="slider"]').eq(2).click().type('{downArrow}', { force: true });
      cy.get('[id="sustainval"]').should('have.html', '99');
    });
  });
  it('Valid Test: Change Release', () => {
    cy.get('div[id=ADSREnvelope]').within(() => {
      cy.get('input').eq(3).click({ force: true });
      cy.get('[role="slider"]').eq(3).click().type('{downArrow}', { force: true });
      cy.get('[id="releaseval"]').should('have.html', '99');
    });
  });
  it('Valid Test: Play Piano With Changed ADSR', () => {
    cy.get('body').eq(0).type(pianoKeys, { delay: pianoDelay });
  });
});

describe('Set Controller Panel: Test Each Input', () => {
  it('Invalid Test: Attempt to set channel to \'0\'', () => {
    cy.get('div[id=setcontroller]').within(() => {
      cy.get('button').eq(0).click({ force: true });
      cy.get('input').eq(0).should('have.value', '1');
    });
  });
  it('Valid Test: Attempt to set channel to \'2\'', () => {
    cy.get('div[id=setcontroller]').within(() => {
      cy.get('button').eq(1).click({ force: true });
      cy.get('input').eq(0).should('have.value', '2');
    });
  });
  it('Valid Test: Attempt to set channel to \'16\' after typing 15', () => {
    cy.get('div[id=setcontroller]').within(() => {
      cy.get('input').eq(0).click({ force: true }).type('15');
      cy.get('button').eq(1).click({ force: true });
      cy.get('input').eq(0).should('have.value', '16');
    });
  });
  it('Invalid Test: Attempt to set channel to \'17\'', () => {
    cy.get('div[id=setcontroller]').within(() => {
      cy.get('button').eq(1).click({ force: true });
      cy.get('input').eq(0).should('have.value', '16');
    });
  });
});
