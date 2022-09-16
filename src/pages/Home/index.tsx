import React, { useCallback, useEffect, useState } from 'react';

import { Menu, VTable } from 'components';
import { Program } from 'services/epg';
import { addToDate, EntityMap } from 'utils';

import { LocalStorageKeys, useLocalStorage, useWindowSize } from 'hooks';
import {
  Container,
  HeaderContainer,
  MenuContainer,
  TableContainer,
  TableMenuContainer,
} from './styles';
import Header from './Header';

const Home: React.FC = () => {
  const [selectedProgramId, setSelectedProgramId] = useState<Set<string>>(
    new Set(),
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [savedPrograms, setSavedPrograms] = useLocalStorage(
    LocalStorageKeys.CURRENT_PROGRAMS,
    [] as Program[],
  );
  const [programs, setPrograms] = useState(
    new EntityMap<Program>(savedPrograms?.map(p => new Program(p))),
  );

  const [selectedProgram, setSelectedProgram] = useState<Program>();

  useEffect(() => {
    setSelectedProgram(programs.get(Array.from(selectedProgramId)[0]));
  }, [programs, selectedProgramId]);

  useEffect(() => {
    if (programs.toArray().length !== 0) {
      setSavedPrograms(programs.toArray());
    }
  }, [programs, setSavedPrograms]);

  const dimension = useWindowSize();

  const heightVariance = (val: number) => {
    // y = x * 1.042 – 205.35
    return Math.ceil(1.042 * val - 205.35);
  };

  const [width, setWidth] = useState(dimension.width - 60);
  const [height, setHeight] = useState(heightVariance(dimension.height));

  useEffect(() => {
    const measure = heightVariance(dimension.height);
    if (measure < 430) {
      setHeight(430);
    } else {
      setHeight(measure);
    }
  }, [setHeight, dimension]);

  const [toggleClass, setToggleClass] = useState(false);

  useEffect(() => {
    if (!toggleClass) {
      if (dimension.width - 60 <= 1100) {
        setWidth(1100);
      } else {
        setWidth(dimension.width - 60);
      }
    }
    if (toggleClass) {
      if (dimension.width - 600 <= 590) {
        setWidth(590);
      } else {
        setWidth(dimension.width - 600);
      }
    }
  }, [setWidth, dimension, toggleClass]);

  const handleAddProgram = useCallback(() => {
    let startDateTime = new Date();
    if (programs.count) {
      const programList = programs.toArray();
      const lastProgram = programList[programList.length - 1];
      startDateTime = addToDate(
        lastProgram.startDateTime,
        lastProgram.duration,
      );
    }
    const addedProgram = new Program({
      duration: 3600,
      startDateTime,
    });
    setPrograms(p => p.add(addedProgram).clone());
    setTimeout(() => {
      setSelectedProgramId(s => {
        const newSelectedProgramId = new Set(s);
        newSelectedProgramId.clear();
        newSelectedProgramId.add(addedProgram.id);
        return newSelectedProgramId;
      });
      if (dimension.width - 600 <= 590) {
        setWidth(590);
      } else {
        setWidth(dimension.width - 600);
      }
    }, 1150);
    setTimeout(() => {
      const objDiv = document.getElementsByClassName(
        'ReactVirtualized__Grid',
      )[0];
      if (objDiv) {
        objDiv.scroll({ top: objDiv.scrollHeight, behavior: 'smooth' });
      }
    }, 100);
  }, [dimension.width, programs]);

  const handleClearProgramList = useCallback(() => {
    setSelectedProgramId(new Set());
    setPrograms(new EntityMap<Program>());
    setSavedPrograms([] as Program[]);
  }, [setSavedPrograms]);

  return (
    <Container>
      <HeaderContainer>
        <Header
          programs={programs}
          selectedProgramId={selectedProgramId}
          setNewPrograms={newPrograms => {
            setSelectedProgramId(new Set());
            setToggleClass(false);
            setSavedPrograms(newPrograms.toArray());
            setPrograms(newPrograms);
          }}
          width={width}
          setWidth={setWidth}
          handleAddProgram={handleAddProgram}
          handleClearProgramList={handleClearProgramList}
        />
      </HeaderContainer>
      <TableMenuContainer>
        <TableContainer
          className="epg-table-menu-content"
          width={selectedProgramId.size !== 1 ? '100%' : 'calc(100% - 535px)'}
        >
          <VTable
            programs={programs}
            setPrograms={setPrograms}
            selectedProgramId={selectedProgramId}
            setSelectedProgramId={setSelectedProgramId}
            setToggleClass={setToggleClass}
            width={width}
            height={height}
          />
        </TableContainer>
        <MenuContainer
          className="epg-table-menu-content"
          width={
            // eslint-disable-next-line no-nested-ternary
            selectedProgramId.size === 1
              ? dimension.width < 1160
                ? '480px'
                : '500px'
              : '0px'
          }
        >
          <Menu
            width={width}
            setWidth={setWidth}
            programs={programs}
            hasChanges={hasChanges}
            setHasChanges={setHasChanges}
            setSelectedProgramId={setSelectedProgramId}
            onSaveProgram={program => {
              setPrograms(p => p.update(program).clone());
              setHasChanges(false);
            }}
            selectedProgram={selectedProgram ?? new Program()}
            handleRemoveProgram={programId => {
              setPrograms(p => {
                const size = p.toArray().length;
                const index = p.indexOf(programId);
                const idList: Set<string> = new Set();
                if (size === 1) {
                  // was the only program on the list
                  handleClearProgramList(); // just clear table
                  setWidth(
                    dimension.width - 60 <= 1160 ? 1160 : dimension.width - 60,
                  ); // force menu container to close
                } else if (index === size - 1) {
                  // was the last program on the list
                  idList.add(p.at(index - 1)?.id ?? '');
                  setSelectedProgramId(idList);
                } else {
                  // all other cases
                  idList.add(p.at(index + 1)?.id ?? '');
                  setSelectedProgramId(idList);
                }
                return p.remove(programId).clone();
              });
            }}
            setToggleClass={setToggleClass}
          />
        </MenuContainer>
      </TableMenuContainer>
    </Container>
  );
};

export default Home;
