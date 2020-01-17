import React, { Component } from 'react';

import NoteTemplate from '../components/NoteTemplate';
import Form from '../components/Form';
import NoteItemList from '../components/NoteItemList';

class Home extends Component {
    id = 3 // 이미 0,1,2 가 존재하므로 3으로 설정

    state = {
        input: '',
        notes: [
            { id: 0, text: ' 리액트 소개', checked: false },
            { id: 1, text: ' 리액트 소개', checked: true },
            { id: 2, text: ' 리액트 소개', checked: false }
        ]
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value // input 의 다음 바뀔 값
        });
    }

    handleCreate = () => {
        const { input, notes } = this.state;
        this.setState({
            input: '', // 인풋 비우고
            // concat 을 사용하여 배열에 추가
            notes: notes.concat({
                id: this.id++,
                text: input,
                checked: false
            })
        });
    }

    handleKeyPress = (e) => {
        // 눌려진 키가 Enter 면 handleCreate 호출
        if (e.key === 'Enter') {
            this.handleCreate();
        }
    }

    handleToggle = (id) => {
        const { notes } = this.state;

        // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
        const index = notes.findIndex(note => note.id === id);
        const selected = notes[index]; // 선택한 객체

        const nextNotes = [...notes]; // 배열을 복사

        // 기존의 값들을 복사하고, checked 값을 덮어쓰기
        nextNotes[index] = {
            ...selected,
            checked: !selected.checked
        };

        this.setState({
            notes: nextNotes
        });
    }

    handleRemove = (id) => {
        const { notes } = this.state;
        this.setState({
            notes: notes.filter(note => note.id !== id)
        });
    }

    render() {
        const { input, notes } = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove
        } = this;
        return (
            <NoteTemplate form={(
                <Form
                    value={input}
                    onKeyPress={handleKeyPress}
                    onChange={handleChange}
                    onCreate={handleCreate}
                />
            )}>
                <NoteItemList notes={notes} onToggle={handleToggle} onRemove={handleRemove} />
            </NoteTemplate>
        )
    }
};

export default Home;