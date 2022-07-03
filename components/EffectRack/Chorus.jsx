import {
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Flex,
  HStack,
} from '@chakra-ui/react';

import { useState } from 'react';

export default function Chorus({ synth, isDisabled }) {
  const [toggle, setToggle] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [delay, setDelay] = useState(0);
  const [depth, setDepth] = useState(0);
  const [feedback, setFeedback] = useState(0);
  const [spread, setSpread] = useState(0);

  function handleClick() {
    if (toggle) {
      synth.Chorus.set({
        wet: 0,
      });
      synth.chainEffects();
      setToggle(false);
    } else {
      synth.Chorus.set({
        wet: 1,
      });
      synth.chainEffects();
      setToggle(true);
    }
  }
  function handleFreq(e) {
    if (!toggle) {
      setToggle(true);
    }
    setFrequency(e);
    synth.Chorus.set({
      wet: 1,
      frequency: e,
    });
    synth.chainEffects();
  }
  function handleDelay(e) {
    if (!toggle) {
      setToggle(true);
    }
    setDelay(e);
    synth.Chorus.set({
      wet: 1,
      delay: e,
    });
    synth.chainEffects();
  }
  function handleDepth(e) {
    if (!toggle) {
      setToggle(true);
    }
    setDepth(e);
    synth.Chorus.set({
      wet: 1,
      depth: e,
    });
    synth.chainEffects();
  }

  function handleFeedback(e) {
    if (!toggle) {
      setToggle(true);
    }
    setFeedback(e);
    synth.Chorus.set({
      wet: 1,
      feedback: e,
    });
    synth.chainEffects();
  }

  function handleSpread(e) {
    if (!toggle) {
      setToggle(true);
    }
    setSpread(e);
    synth.Chorus.set({
      wet: 1,
      spread: e,
    });
    synth.chainEffects();
  }

  return (
    <Flex direction="column" bg="gray.100" rounded="base" width="90%" display="flex" margin="auto" p={4}>
      <Box textAlign="center">Chorus Effect</Box>
      <Switch textAlign="center" onChange={handleClick} isChecked={toggle} isDisabled={isDisabled} />
      <Box fontSize="sm">Frequency</Box>
      <HStack>
        <Slider aria-label="slider-ex-1" flexGrow="1" defaultValue={0} min={0} max={10} step={0.25} onChange={handleFreq} isDisabled={isDisabled}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Box bg="gray.200" boxShadow="inner" textAlign="center" rounded="base" width="20%">{frequency.toFixed(1)}</Box>
      </HStack>

      <Box fontSize="sm">Delay</Box>
      <HStack>
        <Slider aria-label="slider-ex-1" flexGrow="1" defaultValue={1} min={1} max={1000} onChange={handleDelay} isDisabled={isDisabled}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Box bg="gray.200" boxShadow="inner" textAlign="center" rounded="base" width="20%">{delay}</Box>
      </HStack>

      <Box fontSize="sm">Depth</Box>
      <HStack>
        <Slider aria-label="slider-ex-1" flexGrow="1" defaultValue={0} min={0} max={1} step={0.05} onChange={handleDepth} isDisabled={isDisabled}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Box bg="gray.200" boxShadow="inner" textAlign="center" rounded="base" width="20%">{depth.toFixed(2)}</Box>
      </HStack>

      <Box fontSize="sm">Feedback</Box>
      <HStack>
        <Slider aria-label="slider-ex-1" flexGrow="1" defaultValue={0} min={0} max={0.95} step={0.05} onChange={handleFeedback} isDisabled={isDisabled}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Box bg="gray.200" boxShadow="inner" textAlign="center" rounded="base" width="20%">{feedback.toFixed(2)}</Box>
      </HStack>

      <Box fontSize="sm">Spread</Box>
      <HStack>
        <Slider aria-label="slider-ex-1" flexGrow="1" defaultValue={0} min={0} max={180} onChange={handleSpread} isDisabled={isDisabled}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Box bg="gray.200" boxShadow="inner" textAlign="center" rounded="base" width="20%">{spread}</Box>
      </HStack>

    </Flex>
  );
}
